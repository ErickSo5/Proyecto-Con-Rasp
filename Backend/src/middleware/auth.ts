import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { RowDataPacket } from "mysql2/promise";
import { config } from "../config";
import { pool } from "../db";

export type AuthRole = "cliente" | "medico" | "enfermero" | "admin" | "direccion";

export type AuthUser = {
  id: number;
  correo: string;
  nombre: string;
  telefono: string | null;
  role: AuthRole;
  medicoId: number | null;
  ultimaAutenticacion: Date | null;
  pendingMFA?: boolean;
};

const parseToken = (req: Request) => {
  const header = req.headers.authorization;
  if (!header) return null;
  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) return null;
  return token.trim();
};

// Verificar si un token está revocado
const isTokenRevoked = async (token: string): Promise<boolean> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT id FROM revoked_tokens WHERE token = ? AND expires_at > NOW()",
    [token]
  );
  return rows.length > 0;
};

// Obtener la última autenticación del usuario
const getLastAuth = async (userId: number): Promise<Date | null> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT ultima_autenticacion FROM usuario WHERE id_user = ?",
    [userId]
  );
  if (rows.length > 0) {
    return rows[0].ultima_autenticacion;
  }
  return null;
};

// Verificar si requiere reautenticación para acceder al historial clínico
// Basado en: si pasaron más de 10 minutos desde la última autenticación
const requiresReauthentication = async (userId: number): Promise<boolean> => {
  const lastAuth = await getLastAuth(userId);
  if (!lastAuth) return true;
  
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  return lastAuth < tenMinutesAgo;
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = parseToken(req);
    
    if (!token) {
      return res.status(401).json({ message: "No autorizado." });
    }

    // Verificar si el token está revocado
    const revoked = await isTokenRevoked(token);
    if (revoked) {
      return res.status(401).json({ message: "Token revocado." });
    }

    // Verificar token con firma RSA
    const decoded = jwt.verify(token, config.jwt.rsa.publicKey, {
      algorithms: ["RS256"],
    });
    
    const payload =
      typeof decoded === "string"
        ? { sub: decoded }
        : (decoded as {
            sub?: string | number;
            role?: AuthRole;
            medicoId?: number | null;
            type?: string;
            pendingMFA?: boolean;
          });

    // ✅ Permitir "access" o "setup" (si decides usar ese tipo)
    const validTypes = ["access", "setup"];

    // Verificar que sea un access token
    if (payload.type && !validTypes.includes(payload.type)) {
      return res.status(401).json({ message: "Token inválido." });
    }

    const userId = Number(payload.sub);
    if (!Number.isFinite(userId)) {
      return res.status(401).json({ message: "Token invalido." });
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT id_user, correo, nombre, telefono, rol, medico_id, ultima_autenticacion FROM usuario WHERE id_user = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado." });
    }

    const row = rows[0];
    const role = (row.rol ?? "cliente") as AuthRole;

    req.user = {
      id: row.id_user,
      correo: row.correo,
      nombre: row.nombre,
      telefono: row.telefono ?? null,
      role,
      medicoId: row.medico_id ?? null,
      ultimaAutenticacion: row.ultima_autenticacion,
      pendingMFA: !!payload.pendingMFA,
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token invalido." });
  }
};

// Middleware especial para rutas de historial clínico que requieren reautenticación
export const requireRecentAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "No autorizado." });
    }

    const needsReauth = await requiresReauthentication(req.user.id);
    if (needsReauth) {
      return res.status(401).json({ 
        message: "Se requiere reautenticación para acceder al historial clínico.",
        reauthRequired: true 
      });
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al verificar autenticación." });
  }
};

export const requireRole = (...roles: AuthRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "No autorizado." });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "Acceso denegado." });
    }

    return next();
  };
};
