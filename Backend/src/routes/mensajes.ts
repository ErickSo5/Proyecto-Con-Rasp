import { Router } from "express";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { pool } from "../db";

const router = Router();

const formatTimestamp = (value: unknown) => {
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === "string") {
    return value;
  }
  return new Date().toISOString();
};

const getDefaultContact = (category: string) => {
  switch (category) {
    case "doctor":
      return {
        name: "Consulta Médica",
        role: "Doctor",
        specialty: "Medicina General",
      };
    case "admin":
      return {
        name: "Recepción MediCare",
        role: "Administración",
        specialty: null,
      };
    default:
      return {
        name: "Soporte Técnico",
        role: "Soporte",
        specialty: null,
      };
  }
};

router.get("/mensajes/conversaciones", async (req, res) => {
  try {
    const category =
      typeof req.query.category === "string" ? req.query.category : null;
    const search =
      typeof req.query.search === "string" ? req.query.search : null;
    const userId =
      typeof req.query.userId === "string" ? Number(req.query.userId) : null;
    const archived =
      typeof req.query.archived === "string"
        ? req.query.archived === "true"
        : false;

    const where: string[] = ["is_archived = ?"];
    const params: (string | number)[] = [archived ? 1 : 0];

    if (category && category !== "all") {
      where.push("category = ?");
      params.push(category);
    }

    if (Number.isFinite(userId)) {
      where.push("user_id = ?");
      params.push(userId as number);
    }

    if (search) {
      where.push("(contact_name LIKE ? OR last_message LIKE ?)");
      const like = `%${search}%`;
      params.push(like, like);
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT id, category, contact_name, contact_avatar, contact_role, contact_specialty,
              last_message, last_message_at, unread_count, is_pinned, is_online
       FROM conversaciones
       ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
       ORDER BY is_pinned DESC, last_message_at DESC, id DESC`,
      params
    );

    const data = rows.map((row) => ({
      id: row.id,
      contact: {
        name: row.contact_name,
        avatar: row.contact_avatar,
        role: row.contact_role,
        specialty: row.contact_specialty,
      },
      lastMessage: row.last_message,
      timestamp: formatTimestamp(row.last_message_at),
      unread: row.unread_count ?? 0,
      isOnline: Boolean(row.is_online),
      isPinned: Boolean(row.is_pinned),
      category: row.category,
    }));

    return res.json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.get("/mensajes/conversaciones/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ message: "Conversación inválida." });
    }

    const [convRows] = await pool.execute<RowDataPacket[]>(
      `SELECT id, category, contact_name, contact_avatar, contact_role, contact_specialty,
              last_message, last_message_at, unread_count, is_pinned, is_online
       FROM conversaciones
       WHERE id = ?
       LIMIT 1`,
      [id]
    );

    if (convRows.length === 0) {
      return res.status(404).json({ message: "Conversación no encontrada." });
    }

    const [messageRows] = await pool.execute<RowDataPacket[]>(
      `SELECT id, sender_role, content, status, created_at
       FROM conversation_messages
       WHERE conversation_id = ?
       ORDER BY created_at ASC, id ASC`,
      [id]
    );

    const conversation = convRows[0];
    const messages = messageRows.map((row) => ({
      id: row.id,
      content: row.content,
      timestamp: formatTimestamp(row.created_at),
      isOwn: row.sender_role === "cliente",
      status: row.status,
    }));

    return res.json({
      data: {
        id: conversation.id,
        contact: {
          name: conversation.contact_name,
          avatar: conversation.contact_avatar,
          role: conversation.contact_role,
          specialty: conversation.contact_specialty,
        },
        lastMessage: conversation.last_message,
        timestamp: formatTimestamp(conversation.last_message_at),
        unread: conversation.unread_count ?? 0,
        isOnline: Boolean(conversation.is_online),
        isPinned: Boolean(conversation.is_pinned),
        category: conversation.category,
        messages,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.post("/mensajes/conversaciones", async (req, res) => {
  try {
    const category = req.body.department ?? req.body.category;
    const subject = req.body.subject ?? null;
    const message = req.body.message ?? req.body.content;
    const userId = req.body.userId ?? null;

    if (typeof category !== "string" || typeof message !== "string") {
      return res.status(400).json({ message: "Datos incompletos." });
    }

    const contact = getDefaultContact(category);

    const [convResult] = await pool.execute<ResultSetHeader>(
      `INSERT INTO conversaciones
        (user_id, category, subject, contact_name, contact_avatar, contact_role, contact_specialty,
         last_message, last_message_at, unread_count, is_pinned, is_online, is_archived)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), 0, 0, 1, 0)`,
      [
        userId,
        category,
        subject,
        contact.name,
        "/placeholder.svg?height=40&width=40",
        contact.role,
        contact.specialty,
        message,
      ]
    );

    const conversationId = convResult.insertId;

    await pool.execute<ResultSetHeader>(
      `INSERT INTO conversation_messages (conversation_id, sender_role, content, status)
       VALUES (?, 'cliente', ?, 'sent')`,
      [conversationId, message]
    );

    return res.status(201).json({
      message: "Conversación creada.",
      data: { id: conversationId },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.post("/mensajes/conversaciones/:id/mensajes", async (req, res) => {
  try {
    const conversationId = Number(req.params.id);
    const content = req.body.message ?? req.body.content;
    const senderRole = req.body.senderRole ?? "cliente";

    if (!Number.isFinite(conversationId) || typeof content !== "string") {
      return res.status(400).json({ message: "Datos inválidos." });
    }

    await pool.execute<ResultSetHeader>(
      `INSERT INTO conversation_messages (conversation_id, sender_role, content, status)
       VALUES (?, ?, ?, 'sent')`,
      [conversationId, senderRole, content]
    );

    const increaseUnread = senderRole !== "cliente" ? 1 : 0;

    await pool.execute(
      `UPDATE conversaciones
       SET last_message = ?, last_message_at = NOW(),
           unread_count = unread_count + ?
       WHERE id = ?`,
      [content, increaseUnread, conversationId]
    );

    return res.status(201).json({ message: "Mensaje enviado." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.patch("/mensajes/conversaciones/:id/leer", async (req, res) => {
  try {
    const conversationId = Number(req.params.id);
    if (!Number.isFinite(conversationId)) {
      return res.status(400).json({ message: "Conversación inválida." });
    }

    await pool.execute(
      "UPDATE conversaciones SET unread_count = 0 WHERE id = ?",
      [conversationId]
    );

    return res.json({ message: "Conversación marcada como leída." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.patch("/mensajes/conversaciones/:id/pin", async (req, res) => {
  try {
    const conversationId = Number(req.params.id);
    const isPinned = req.body.isPinned;

    if (!Number.isFinite(conversationId)) {
      return res.status(400).json({ message: "Conversación inválida." });
    }

    await pool.execute(
      "UPDATE conversaciones SET is_pinned = ? WHERE id = ?",
      [isPinned ? 1 : 0, conversationId]
    );

    return res.json({ message: "Conversación actualizada." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.patch("/mensajes/conversaciones/:id/archivar", async (req, res) => {
  try {
    const conversationId = Number(req.params.id);
    const archived = req.body.archived;

    if (!Number.isFinite(conversationId)) {
      return res.status(400).json({ message: "Conversación inválida." });
    }

    await pool.execute(
      "UPDATE conversaciones SET is_archived = ? WHERE id = ?",
      [archived ? 1 : 0, conversationId]
    );

    return res.json({ message: "Conversación actualizada." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

export default router;
