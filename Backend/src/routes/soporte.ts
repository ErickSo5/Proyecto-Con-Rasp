import { Router } from "express";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { pool } from "../db";

const router = Router();

router.post("/soporte", async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const asunto = req.body.asunto;
    const mensaje = req.body.mensaje;

    if (
      typeof nombre !== "string" ||
      typeof email !== "string" ||
      typeof asunto !== "string" ||
      typeof mensaje !== "string"
    ) {
      return res.status(400).json({ message: "Datos incompletos." });
    }

    await pool.execute<ResultSetHeader>(
      `INSERT INTO soporte_mensajes (nombre, email, asunto, mensaje)
       VALUES (?, ?, ?, ?)`,
      [nombre.trim(), email.trim().toLowerCase(), asunto.trim(), mensaje.trim()]
    );

    return res.status(201).json({ message: "Mensaje recibido correctamente." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.get("/soporte/tickets", async (req, res) => {
  try {
    const userId =
      typeof req.query.userId === "string" ? Number(req.query.userId) : null;

    const where: string[] = [];
    const params: (number | string)[] = [];

    if (Number.isFinite(userId)) {
      where.push("user_id = ?");
      params.push(userId as number);
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT id, subject, status, created_at, updated_at
       FROM soporte_tickets
       ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
       ORDER BY updated_at DESC`,
      params
    );

    const data = rows.map((row) => ({
      id: row.id,
      subject: row.subject,
      status: row.status,
      date: row.created_at
        ? new Date(row.created_at).toISOString().split("T")[0]
        : null,
      lastUpdate: row.updated_at
        ? new Date(row.updated_at).toISOString().split("T")[0]
        : null,
    }));

    return res.json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.post("/soporte/tickets", async (req, res) => {
  try {
    const subject = req.body.subject ?? req.body.asunto;
    const userId = req.body.userId ?? null;

    if (typeof subject !== "string" || subject.trim() === "") {
      return res.status(400).json({ message: "Asunto requerido." });
    }

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO soporte_tickets (user_id, subject, status)
       VALUES (?, ?, 'abierto')`,
      [userId, subject.trim()]
    );

    return res.status(201).json({
      message: "Ticket creado correctamente.",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

export default router;
