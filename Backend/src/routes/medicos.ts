import { Router } from "express";
import type { RowDataPacket } from "mysql2/promise";
import { pool } from "../db";
import { slugify } from "../utils/slug";
import { authenticate, requireRole } from "../middleware/auth";

const router = Router();

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
];

const formatDate = (value: unknown) => {
  if (value instanceof Date) {
    return value.toISOString().split("T")[0];
  }
  if (typeof value === "string") {
    return value;
  }
  return String(value);
};

const formatTime = (value: unknown) => {
  if (value instanceof Date) {
    return value.toISOString().split("T")[1].slice(0, 5);
  }
  return String(value).slice(0, 5);
};

const mapDbStatusToApi = (status: string) => {
  switch (status) {
    case "agendada":
      return "pendiente";
    case "confirmada":
      return "confirmada";
    case "finalizada":
      return "completada";
    case "cancelada":
      return "cancelada";
    default:
      return "pendiente";
  }
};

const mapApiStatusToDb = (status: string) => {
  switch (status) {
    case "pendiente":
      return "agendada";
    case "confirmada":
      return "confirmada";
    case "completada":
      return "finalizada";
    case "cancelada":
      return "cancelada";
    default:
      return "agendada";
  }
};

router.get("/especialidades", async (_req, res) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT DISTINCT especialidad FROM medicos ORDER BY especialidad"
    );

    const data = rows.map((row) => ({
      id: slugify(String(row.especialidad)),
      nombre: row.especialidad,
    }));

    return res.json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.get("/medicos", async (req, res) => {
  try {
    const especialidad =
      typeof req.query.especialidad === "string" ? req.query.especialidad : null;

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT Num_trabajador, Nombre, especialidad, telefono
       FROM medicos
       ORDER BY Nombre`
    );

    const filtered =
      especialidad && especialidad.trim() !== ""
        ? rows.filter((row) => {
            const rowEspecialidad = String(row.especialidad ?? "");
            return (
              rowEspecialidad === especialidad ||
              slugify(rowEspecialidad) === slugify(especialidad)
            );
          })
        : rows;

    const data = filtered.map((row) => ({
      id: row.Num_trabajador,
      slug: slugify(String(row.Nombre ?? "")),
      nombre: row.Nombre,
      especialidad: row.especialidad,
      especialidadSlug: slugify(String(row.especialidad ?? "")),
      telefono: row.telefono,
    }));

    return res.json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.get("/medicos/:id", async (req, res) => {
  try {
    const param = String(req.params.id ?? "");
    let id = Number(param);

    if (!Number.isFinite(id)) {
      const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT Num_trabajador, Nombre FROM medicos"
      );
      const match = rows.find(
        (row) => slugify(String(row.Nombre ?? "")) === slugify(param)
      );
      if (!match) {
        return res.status(400).json({ message: "Id de medico invalido." });
      }
      id = Number(match.Num_trabajador);
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT Num_trabajador, Nombre, especialidad, telefono FROM medicos WHERE Num_trabajador = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Medico no encontrado." });
    }

    const row = rows[0];

    return res.json({
      data: {
        id: row.Num_trabajador,
        slug: slugify(String(row.Nombre ?? "")),
        nombre: row.Nombre,
        especialidad: row.especialidad,
        especialidadSlug: slugify(String(row.especialidad ?? "")),
        telefono: row.telefono,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.get("/medicos/:id/horarios", async (req, res) => {
  try {
    const param = String(req.params.id ?? "");
    let id = Number(param);
    const fecha = typeof req.query.fecha === "string" ? req.query.fecha : null;

    if (!Number.isFinite(id)) {
      const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT Num_trabajador, Nombre FROM medicos"
      );
      const match = rows.find(
        (row) => slugify(String(row.Nombre ?? "")) === slugify(param)
      );
      if (!match) {
        return res
          .status(400)
          .json({ message: "Id de medico y fecha son requeridos." });
      }
      id = Number(match.Num_trabajador);
    }

    if (!fecha) {
      return res
        .status(400)
        .json({ message: "Id de medico y fecha son requeridos." });
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT hora FROM citas WHERE Num_trabajador = ? AND fecha = ? AND estado != 'cancelada'",
      [id, fecha]
    );

    const occupied = rows.map((row) => formatTime(row.hora));
    const available = TIME_SLOTS.filter((slot) => !occupied.includes(slot));

    return res.json({
      data: {
        fecha,
        disponibles: available,
        ocupados: occupied,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.get(
  "/medicos/:id/citas",
  authenticate,
  requireRole("medico"),
  async (req, res) => {
  try {
    const param = String(req.params.id ?? "");
    let id = Number(param);
    if (!Number.isFinite(id)) {
      const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT Num_trabajador, Nombre FROM medicos"
      );
      const match = rows.find(
        (row) => slugify(String(row.Nombre ?? "")) === slugify(param)
      );
      if (!match) {
        return res.status(400).json({ message: "Id de medico invalido." });
      }
      id = Number(match.Num_trabajador);
    }

    const user = req.user!;
    if (!user.medicoId || user.medicoId !== id) {
      return res.status(403).json({ message: "Acceso denegado." });
    }

    const from = typeof req.query.from === "string" ? req.query.from : null;
    const to = typeof req.query.to === "string" ? req.query.to : null;
    const status = typeof req.query.status === "string" ? req.query.status : null;

    const whereClauses = ["c.Num_trabajador = ?"];
    const params: (string | number)[] = [id];

    if (from && to) {
      whereClauses.push("c.fecha BETWEEN ? AND ?");
      params.push(from, to);
    } else if (from) {
      whereClauses.push("c.fecha >= ?");
      params.push(from);
    } else if (to) {
      whereClauses.push("c.fecha <= ?");
      params.push(to);
    }

    if (status) {
      whereClauses.push("c.estado = ?");
      params.push(mapApiStatusToDb(status));
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT c.id_cita, c.fecha, c.hora, c.motivo, c.estado, c.notas,
              u.nombre AS paciente_nombre, u.correo AS paciente_correo, u.telefono AS paciente_telefono,
              m.Num_trabajador AS medico_id, m.Nombre AS medico_nombre, m.especialidad
       FROM citas c
       JOIN usuario u ON c.id_user = u.id_user
       JOIN medicos m ON c.Num_trabajador = m.Num_trabajador
       WHERE ${whereClauses.join(" AND ")}
       ORDER BY c.fecha ASC, c.hora ASC`,
      params
    );

    const data = rows.map((row) => ({
      id: row.id_cita,
      patientName: row.paciente_nombre,
      patientEmail: row.paciente_correo,
      patientPhone: row.paciente_telefono,
      date: formatDate(row.fecha),
      time: formatTime(row.hora),
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
  }
);

router.get(
  "/medicos/:id/resumen",
  authenticate,
  requireRole("medico"),
  async (req, res) => {
  try {
    const param = String(req.params.id ?? "");
    let id = Number(param);
    if (!Number.isFinite(id)) {
      const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT Num_trabajador, Nombre FROM medicos"
      );
      const match = rows.find(
        (row) => slugify(String(row.Nombre ?? "")) === slugify(param)
      );
      if (!match) {
        return res.status(400).json({ message: "Id de medico invalido." });
      }
      id = Number(match.Num_trabajador);
    }

    const user = req.user!;
    if (!user.medicoId || user.medicoId !== id) {
      return res.status(403).json({ message: "Acceso denegado." });
    }

    const from = typeof req.query.from === "string" ? req.query.from : null;
    const to = typeof req.query.to === "string" ? req.query.to : null;

    const whereClauses = ["Num_trabajador = ?"];
    const params: (string | number)[] = [id];

    if (from && to) {
      whereClauses.push("fecha BETWEEN ? AND ?");
      params.push(from, to);
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT estado, COUNT(*) AS total
       FROM citas
       WHERE ${whereClauses.join(" AND ")}
       GROUP BY estado`,
      params
    );

    const summary = {
      pendiente: 0,
      confirmada: 0,
      completada: 0,
      cancelada: 0,
    };

    rows.forEach((row) => {
      const apiStatus = mapDbStatusToApi(row.estado);
      summary[apiStatus as keyof typeof summary] = row.total;
    });

    return res.json({ data: summary });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
  }
);

export { mapApiStatusToDb, mapDbStatusToApi, TIME_SLOTS };
export default router;
