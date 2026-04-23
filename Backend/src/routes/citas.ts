import { Router } from "express";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { pool } from "../db";
import { mapApiStatusToDb, mapDbStatusToApi } from "./medicos";
import { slugify } from "../utils/slug";
import { authenticate, requireRole } from "../middleware/auth";

const router = Router();

const buildNombreCompleto = (nombre: string, apellidos?: string) => {
  const parts = [nombre.trim()];
  if (apellidos && apellidos.trim() !== "") {
    parts.push(apellidos.trim());
  }
  return parts.join(" ").trim();
};

const resolveMedicoId = async (doctorRaw: unknown) => {
  const numeric = Number(doctorRaw);
  if (Number.isFinite(numeric)) return numeric;

  if (typeof doctorRaw === "string") {
    const [medicos] = await pool.execute<RowDataPacket[]>(
      "SELECT Num_trabajador, Nombre FROM medicos"
    );
    const match = medicos.find(
      (row) => slugify(String(row.Nombre ?? "")) === slugify(doctorRaw)
    );
    if (match) {
      return Number(match.Num_trabajador);
    }
  }

  return null;
};

router.post("/citas", authenticate, requireRole("cliente"), async (req, res) => {
  try {
    const user = req.user!;
    const doctorRaw =
      req.body.Num_trabajador ?? req.body.medicoId ?? req.body.medico_id;
    const fecha = req.body.fecha;
    const hora = req.body.hora;
    const motivo = req.body.motivo ?? null;

    if (typeof fecha !== "string" || typeof hora !== "string") {
      return res.status(400).json({ message: "Datos incompletos." });
    }

    const Num_trabajador = await resolveMedicoId(doctorRaw);

    if (!Number.isFinite(Num_trabajador)) {
      return res.status(400).json({ message: "Medico invalido." });
    }

    const [doctorRows] = await pool.execute<RowDataPacket[]>(
      "SELECT Num_trabajador FROM medicos WHERE Num_trabajador = ?",
      [Num_trabajador]
    );

    if (doctorRows.length === 0) {
      return res.status(404).json({ message: "Medico no encontrado." });
    }

    const [existingCita] = await pool.execute<RowDataPacket[]>(
      "SELECT id_cita FROM citas WHERE Num_trabajador = ? AND fecha = ? AND hora = ?",
      [Num_trabajador, fecha, hora]
    );

    if (existingCita.length > 0) {
      return res.status(409).json({ message: "Horario no disponible." });
    }

    const nombreRaw = req.body.nombre ?? req.body.fullName ?? req.body.name;
    const apellidos = req.body.apellidos;
    const telefonoRaw = req.body.telefono ?? req.body.phone;

    const nombreCompleto =
      typeof nombreRaw === "string" && nombreRaw.trim() !== ""
        ? buildNombreCompleto(
            nombreRaw,
            typeof apellidos === "string" ? apellidos : undefined
          )
        : null;

    const telefono =
      typeof telefonoRaw === "string"
        ? telefonoRaw.trim()
        : typeof telefonoRaw === "number" && Number.isFinite(telefonoRaw)
        ? String(telefonoRaw)
        : null;

    if (nombreCompleto || telefono) {
      await pool.execute(
        "UPDATE usuario SET nombre = COALESCE(?, nombre), telefono = COALESCE(?, telefono) WHERE id_user = ?",
        [nombreCompleto, telefono, user.id]
      );
    }

    const [result] = await pool.execute<ResultSetHeader>(
      "INSERT INTO citas (id_user, Num_trabajador, fecha, hora, motivo, estado) VALUES (?, ?, ?, ?, ?, 'agendada')",
      [user.id, Num_trabajador, fecha, hora, motivo]
    );

    return res.status(201).json({
      message: "Cita creada correctamente.",
      data: {
        id: result.insertId,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.get("/citas", authenticate, requireRole("cliente"), async (req, res) => {
  try {
    const user = req.user!;
    const status = typeof req.query.status === "string" ? req.query.status : null;

    const where: string[] = ["c.id_user = ?"];
    const params: (string | number)[] = [user.id];

    if (status) {
      where.push("c.estado = ?");
      params.push(mapApiStatusToDb(status));
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT c.id_cita, c.fecha, c.hora, c.motivo, c.estado, c.notas,
              m.Num_trabajador AS medico_id, m.Nombre AS medico_nombre, m.especialidad
       FROM citas c
       JOIN medicos m ON c.Num_trabajador = m.Num_trabajador
       WHERE ${where.join(" AND ")}
       ORDER BY c.fecha ASC, c.hora ASC`,
      params
    );

    const data = rows.map((row) => ({
      id: row.id_cita,
      date: row.fecha instanceof Date ? row.fecha.toISOString().split("T")[0] : row.fecha,
      time: String(row.hora).slice(0, 5),
      specialty: row.especialidad,
      reason: row.motivo,
      status: mapDbStatusToApi(row.estado),
      notes: row.notas,
      doctor: {
        id: row.medico_id,
        nombre: row.medico_nombre,
      },
    }));

    return res.json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.patch(
  "/citas/:id/estado",
  authenticate,
  requireRole("medico"),
  async (req, res) => {
    try {
      const user = req.user!;
      const id = Number(req.params.id);
      const estado = req.body.estado;

      if (!Number.isFinite(id) || typeof estado !== "string") {
        return res.status(400).json({ message: "Datos invalidos." });
      }

      if (!user.medicoId) {
        return res.status(403).json({ message: "Medico no autorizado." });
      }

      const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT id_cita FROM citas WHERE id_cita = ? AND Num_trabajador = ?",
        [id, user.medicoId]
      );

      if (rows.length === 0) {
        return res.status(403).json({ message: "Acceso denegado." });
      }

      const estadoDb = mapApiStatusToDb(estado);

      await pool.execute("UPDATE citas SET estado = ? WHERE id_cita = ?", [
        estadoDb,
        id,
      ]);

      return res.json({ message: "Estado actualizado correctamente." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor." });
    }
  }
);

router.patch(
  "/citas/:id/notas",
  authenticate,
  requireRole("medico"),
  async (req, res) => {
    try {
      const user = req.user!;
      const id = Number(req.params.id);
      const notas = req.body.notas ?? req.body.notes;

      if (!Number.isFinite(id) || typeof notas !== "string") {
        return res.status(400).json({ message: "Notas invalidas." });
      }

      if (!user.medicoId) {
        return res.status(403).json({ message: "Medico no autorizado." });
      }

      const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT id_cita FROM citas WHERE id_cita = ? AND Num_trabajador = ?",
        [id, user.medicoId]
      );

      if (rows.length === 0) {
        return res.status(403).json({ message: "Acceso denegado." });
      }

      await pool.execute("UPDATE citas SET notas = ? WHERE id_cita = ?", [
        notas,
        id,
      ]);

      return res.json({ message: "Notas guardadas correctamente." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor." });
    }
  }
);

export default router;
