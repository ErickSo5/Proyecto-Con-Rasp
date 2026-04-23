import { Router } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { pool } from "../db";
import { config } from "../config";
import { sendPasswordResetEmail } from "../services/mailer";
import { authenticate } from "../middleware/auth";
import { verifyToken } from "../services/mfa.services";

import { authenticateWithLdap, isLdapEnabled } from "../services/ldap";

const router = Router();

// Normalizar email o username
const normalizeIdentifier = (value: string) => value.trim().toLowerCase();

// Verificar si es un email válido
const isEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const normalizeEmail = (value: string) => value.trim().toLowerCase();

const resolvePassword = (body: Record<string, unknown>, key: string) => {
  const candidates = [
    key,
    "contrasena",
    "password",
    "nueva_contrasena",
    "newPassword",
  ];
  for (const candidate of candidates) {
    const value = body[candidate];
    if (typeof value === "string" && value.trim() !== "") {
      return value;
    }
  }
  return null;
};

const resolveNombre = (body: Record<string, unknown>) => {
  const candidates = ["nombre", "fullName", "name"];
  for (const candidate of candidates) {
    const value = body[candidate];
    if (typeof value === "string" && value.trim() !== "") {
      return value.trim();
    }
  }
  return null;
};

const resolveTelefono = (body: Record<string, unknown>) => {
  const value = body.telefono ?? body.phone;
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  return "";
};

// Generar access token (10 minutos) con firma RSA
export const signAccessToken = (user: { id: number; role: string; medicoId: number | null }) => {
  const payload = {
    sub: user.id,
    role: user.role,
    medicoId: user.medicoId,
    type: "access",
  };
  
  return jwt.sign(payload, config.jwt.rsa.privateKey, {
    algorithm: "RS256",
    expiresIn: config.jwt.accessExpiresIn,
  } as jwt.SignOptions);
};

// Generar refresh token (7 días) con firma RSA
export const signRefreshToken = (user: { id: number; role: string; medicoId: number | null }) => {
  const payload = {
    sub: user.id,
    role: user.role,
    medicoId: user.medicoId,
    type: "refresh",
    tokenId: crypto.randomUUID(),
  };
  
  return jwt.sign(payload, config.jwt.rsa.privateKey, {
    algorithm: "RS256",
    expiresIn: config.jwt.refreshExpiresIn,
  } as jwt.SignOptions);
};

// Guardar refresh token en la base de datos
export const saveRefreshToken = async (userId: number, token: string) => {
  // Calcular fecha de expiración (7 días)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  
  await pool.execute(
    "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
    [userId, token, expiresAt]
  );
};

// Revocar un token
const revokeToken = async (token: string, tokenType: "access" | "refresh") => {
  try {
    const decoded = jwt.verify(token, config.jwt.rsa.publicKey, {
      algorithms: ["RS256"],
    }) as { exp?: number };
    
    if (decoded.exp) {
      const expiresAt = new Date(decoded.exp * 1000);
      await pool.execute(
        "INSERT INTO revoked_tokens (token, token_type, expires_at) VALUES (?, ?, ?)",
        [token, tokenType, expiresAt]
      );
    }
  } catch (error) {
    console.error("Error al revocar token:", error);
  }
};

// Actualizar última autenticación
const updateLastAuth = async (userId: number) => {
  try {
    await pool.execute(
      "UPDATE usuario SET ultima_autenticacion = NOW() WHERE id_user = ?",
      [userId]
    );
  } catch (error) {
    console.log("Columna ultima_autenticacion no existe, saltando...");
  }
};

// Eliminar todos los refresh tokens del usuario
const revokeAllUserTokens = async (userId: number) => {
  const [tokens] = await pool.execute<RowDataPacket[]>(
    "SELECT token FROM refresh_tokens WHERE user_id = ?",
    [userId]
  );
  
  for (const row of tokens) {
    await revokeToken(row.token, "refresh");
  }
  
  await pool.execute(
    "DELETE FROM refresh_tokens WHERE user_id = ?",
    [userId]
  );
};

router.post("/register", async (req, res) => {
  try {
    const correoRaw = req.body.correo ?? req.body.email;
    const nombre = resolveNombre(req.body);
    const telefono = resolveTelefono(req.body);
    const password = resolvePassword(req.body, "contrasena");

    if (typeof correoRaw !== "string" || !nombre || !password) {
      return res.status(400).json({ message: "Datos incompletos." });
    }

    const correo = normalizeEmail(correoRaw);

    const [existing] = await pool.execute<RowDataPacket[]>(
      "SELECT id_user FROM usuario WHERE correo = ?",
      [correo]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: "El correo ya esta registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [result] = await pool.execute<ResultSetHeader>(
      "INSERT INTO usuario (correo, contrasena, nombre, telefono, rol, medico_id) VALUES (?, ?, ?, ?, 'cliente', NULL)",
      [correo, hashedPassword, nombre, telefono]
    );

    const accessToken = signAccessToken({ id: result.insertId, role: "cliente", medicoId: null });
    const refreshToken = signRefreshToken({ id: result.insertId, role: "cliente", medicoId: null });
    
    await saveRefreshToken(result.insertId, refreshToken);

    return res.status(201).json({
      accessToken,
      refreshToken,
      user: {
        id_user: result.insertId,
        correo,
        nombre,
        telefono,
        rol: "cliente",
        medico_id: null,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const correoRaw = req.body.correo ?? req.body.email;
    const password = req.body.contrasena ?? req.body.password;

    if (typeof correoRaw !== "string" || !password) {
      return res.status(400).json({ message: "Correo y contrasena son requeridos." });
    }

    const correo = normalizeEmail(correoRaw);

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT id_user, correo, contrasena, nombre, telefono, rol, medico_id, mfa_habilitado, totp_secret 
       FROM usuario WHERE correo = ?`,
      [correo]
    );

    if (rows.length === 0) return res.status(401).json({ message: "Credenciales invalidas." });

    const user = rows[0];
    const matches = await bcrypt.compare(password, user.contrasena);

    if (!matches) return res.status(401).json({ message: "Credenciales invalidas." });

    // 1. Objeto de usuario estandarizado
    const userData = {
      id: user.id_user,
      name: user.nombre,
      email: user.correo,
      role: (user.rol || "cliente").toLowerCase().trim(),
      roleLabel: user.rol === 'medico' ? 'Médico' : 'Personal',
      mfa_habilitado: !!user.mfa_habilitado
    };

    const rolesConMFA = ["medico", "enfermero", "direccion", "admin"];
    const requiereMFA = rolesConMFA.includes(userData.role);

    // 2. Lógica de redirección por MFA
    if (requiereMFA) {
      // Caso: Necesita configurar por primera vez
      if (!user.mfa_habilitado) {
        const setupToken = jwt.sign(
          { sub: user.id_user, type: "setup" }, 
          config.jwt.rsa.privateKey, 
          { algorithm: "RS256", expiresIn: '5m' }
        );
        return res.json({ mfaSetupRequired: true, setupToken, userId: user.id_user, user: userData });
      }

      // Caso: Ya tiene MFA, solo pedir código
      return res.json({ mfaRequired: true, userId: user.id_user, user: userData });
    }

    // 3. Flujo para usuarios sin MFA (Clientes o flujo final)
    await revokeAllUserTokens(user.id_user);

    const accessToken = signAccessToken({
      id: user.id_user,
      role: userData.role,
      medicoId: user.medico_id ?? null,
    });

    const refreshToken = signRefreshToken({
      id: user.id_user,
      role: userData.role,
      medicoId: user.medico_id ?? null,
    });

    await saveRefreshToken(user.id_user, refreshToken);
    await updateLastAuth(user.id_user);

    return res.json({ accessToken, refreshToken, user: userData });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.post("/refresh", async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken ?? req.body.refresh_token;
    
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token requerido." });
    }
    
    const decoded = jwt.verify(refreshToken, config.jwt.rsa.publicKey, {
      algorithms: ["RS256"],
    }) as { sub?: string | number; type?: string; exp?: number };
    
    if (decoded.type !== "refresh") {
      return res.status(401).json({ message: "Token inválido." });
    }
    
    const userId = Number(decoded.sub);
    
    const [tokens] = await pool.execute<RowDataPacket[]>(
      "SELECT id FROM refresh_tokens WHERE user_id = ? AND token = ? AND expires_at > NOW()",
      [userId, refreshToken]
    );
    
    if (tokens.length === 0) {
      return res.status(401).json({ message: "Refresh token inválido o expirado." });
    }
    
    const [users] = await pool.execute<RowDataPacket[]>(
      "SELECT id_user, correo, nombre, telefono, rol, medico_id FROM usuario WHERE id_user = ?",
      [userId]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado." });
    }
    
    const user = users[0];
    
    const newAccessToken = signAccessToken({
      id: user.id_user,
      role: user.rol ?? "cliente",
      medicoId: user.medico_id ?? null,
    });
    
    await updateLastAuth(user.id_user);
    
    return res.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Error en refresh:", error);
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
});

router.post("/logout", authenticate, async (req, res) => {
  try {
    const userId = req.user?.id;
    const accessToken = req.headers.authorization?.replace("Bearer ", "");
    
    if (userId) {
      await revokeAllUserTokens(userId);
      
      if (accessToken) {
        await revokeToken(accessToken, "access");
      }
    }
    
    return res.json({ message: "Sesión cerrada correctamente." });
  } catch (error) {
    console.error("Error en logout:", error);
    return res.status(500).json({ message: "Error al cerrar sesión." });
  }
});

router.get("/me", authenticate, async (req, res) => {
  return res.json({
    user: {
      id_user: req.user?.id,
      correo: req.user?.correo,
      nombre: req.user?.nombre,
      telefono: req.user?.telefono,
      rol: req.user?.role,
      medico_id: req.user?.medicoId ?? null,
    },
  });
});

router.post("/password/forgot", async (req, res) => {
  try {
    const correoRaw = req.body.correo ?? req.body.email;

    if (typeof correoRaw !== "string") {
      return res.status(400).json({ message: "Correo requerido." });
    }

    const correo = normalizeEmail(correoRaw);

    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT id_user, correo FROM usuario WHERE correo = ?",
      [correo]
    );

    if (rows.length > 0) {
      const user = rows[0];
      const code = String(crypto.randomInt(0, 1000000)).padStart(6, "0");
      const tokenHash = crypto.createHash("sha256").update(code).digest("hex");
      const expiresAt = new Date(
        Date.now() + config.reset.tokenTtlMinutes * 60 * 1000
      );

      await pool.execute(
        "UPDATE password_reset_tokens SET used_at = NOW() WHERE id_user = ? AND used_at IS NULL",
        [user.id_user]
      );

      await pool.execute<ResultSetHeader>(
        "INSERT INTO password_reset_tokens (id_user, token_hash, expires_at) VALUES (?, ?, ?)",
        [user.id_user, tokenHash, expiresAt]
      );

      await sendPasswordResetEmail(user.correo, code);
    }

    return res.json({
      message:
        "Si el correo existe, recibiras un mensaje con instrucciones para restablecer tu contrasena.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.post("/password/reset", async (req, res) => {
  try {
    const token = req.body.token ?? req.body.codigo ?? req.body.code;
    const newPassword = resolvePassword(req.body, "nueva_contrasena");

    if (typeof token !== "string" || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token y nueva contrasena son requeridos." });
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT prt.id, prt.id_user, prt.expires_at, prt.used_at
       FROM password_reset_tokens prt
       WHERE prt.token_hash = ?
       LIMIT 1`,
      [tokenHash]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Token invalido o expirado." });
    }

    const record = rows[0];

    if (record.used_at) {
      return res.status(400).json({ message: "Token ya utilizado." });
    }

    if (new Date(record.expires_at).getTime() < Date.now()) {
      return res.status(400).json({ message: "Token expirado." });
    }

    // Verificar historial de contraseñas
    const [history] = await pool.execute<RowDataPacket[]>(
      "SELECT password_hash FROM password_history WHERE user_id = ?",
      [record.id_user]
    );

    for (const old of history) {
      const same = await bcrypt.compare(newPassword, old.password_hash);
      if (same) {
        return res.status(400).json({
          message: "No puedes reutilizar una contraseña anterior."
        });
      }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Obtener contraseña actual
    const [currentPassword] = await pool.execute<RowDataPacket[]>(
      "SELECT contrasena FROM usuario WHERE id_user = ?",
      [record.id_user]
    );

    // Guardar en historial
    await pool.execute(
      "INSERT INTO password_history (user_id, password_hash) VALUES (?, ?)",
      [record.id_user, currentPassword[0].contrasena]
    );

    await pool.execute(
      "UPDATE usuario SET contrasena = ?, password_updated_at = NOW() WHERE id_user = ?",
      [hashedPassword, record.id_user]
    );

    await pool.execute(
      "UPDATE password_reset_tokens SET used_at = NOW() WHERE id = ?",
      [record.id]
    );

    return res.json({ message: "Contrasena actualizada correctamente." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});


router.post("/verify-mfa-login", async (req, res) => {

  const { userId, token } = req.body;

  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT totp_secret, rol, medico_id FROM usuario WHERE id_user=?",
    [userId]
  );

  if (rows.length === 0) {
    return res.status(404).json({
      message: "Usuario no encontrado"
    });
  }

  const user = rows[0];

  const valid = verifyToken(user.totp_secret, token);

  if (!valid) {
    return res.status(401).json({
      message: "Código incorrecto"
    });
  }

  await revokeAllUserTokens(userId);

  const accessToken = signAccessToken({
    id: userId,
    role: user.rol,
    medicoId: user.medico_id ?? null
  });

  const refreshToken = signRefreshToken({
    id: userId,
    role: user.rol,
    medicoId: user.medico_id ?? null
  });

  await saveRefreshToken(userId, refreshToken);

  await updateLastAuth(userId);



  const [userData] = await pool.execute<RowDataPacket[]>(
    "SELECT id_user, nombre, correo, rol FROM usuario WHERE id_user=?",
    [userId]
  );

  const u = userData[0];

  // En el router de verificación del backend
  return res.json({
    success: true,
    accessToken,
    refreshToken,
    user: {
      id: u.id_user,
      name: u.nombre,
      role: u.rol, // Asegúrate de que aquí llega 'medico', 'enfermero', etc.
      roleLabel: u.rol.charAt(0).toUpperCase() + u.rol.slice(1),
      mfa_habilitado: true
    }
  });

});

export default router;
