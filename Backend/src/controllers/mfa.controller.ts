import { generateMFASecret, generateQR, verifyToken } from "../services/mfa.services";
import { pool } from "../db";
import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import speakeasy from "speakeasy";
import { signAccessToken, signRefreshToken, saveRefreshToken } from "../routes/auth"; // Ajusta la ruta según tu proyecto

export const setupMFA = async (req: Request, res: Response) => {
  const userId = req.body.userId || req.user?.id;
  if (!userId) return res.status(400).json({ message: "userId requerido" });

  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT totp_secret, correo FROM usuario WHERE id_user=?", 
    [userId]
  );

  const user = rows[0];
  let secretBase32 = user.totp_secret;
  let otpauthUrl = "";

  if (!secretBase32) {
    // 💡 Generamos el secreto usando la nueva utilidad
    const mfa = generateMFASecret(user.correo);
    secretBase32 = mfa.base32;
    otpauthUrl = mfa.otpauth_url || "";

    await pool.execute(
      "UPDATE usuario SET totp_secret=? WHERE id_user=?",
      [secretBase32, userId]
    );
  } else {
    // Si ya existe el secreto, reconstruimos la URL de autenticación
    otpauthUrl = speakeasy.otpauthURL({
      secret: secretBase32,
      label: user.correo,
      issuer: "ClinicaVictorio",
      encoding: "base32"
    });
  }

  const qr = await generateQR(otpauthUrl);
  res.json({ qr });
};

export const verifyMFA = async (req: Request, res: Response) => {

  try {

    const { userId, token } = req.body;
    console.log("BODY VERIFY MFA:", req.body);
    if (!userId || !token) {
      return res.status(400).json({
        message: "userId y token requeridos"
      });
    }

    // obtener secret del usuario
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT totp_secret FROM usuario WHERE id_user=?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }

    const user = rows[0] as RowDataPacket & { totp_secret: string };

    if (!user.totp_secret) {
      return res.status(400).json({
        message: "MFA no configurado"
      });
    }

    // limpiar token
    const cleanToken = token.toString().trim();

    // verificar código
    const valid = verifyToken(user.totp_secret, cleanToken);

    console.log("TOKEN:", cleanToken);
    console.log("SECRET:", user.totp_secret);
    console.log("VALID:", valid);

    const expected = speakeasy.totp({
      secret: user.totp_secret,
      encoding: "base32"
    });

    console.log("TOKEN ESPERADO:", expected);

    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "Código incorrecto"
      });
    }

    // activar MFA
    await pool.execute(
      "UPDATE usuario SET mfa_habilitado=TRUE WHERE id_user=?",
      [userId]
    );
  
    // 1. Obtener los datos completos del usuario para el token y el frontend
    const [userData] = await pool.execute<RowDataPacket[]>(
      "SELECT id_user, nombre, correo, rol, medico_id FROM usuario WHERE id_user=?",
      [userId]
    );

    const userRecord = userData[0];

    // 2. GENERAR los tokens (esto es lo que faltaba)
    const accessToken = signAccessToken({
      id: userRecord.id_user,
      role: userRecord.rol,
      medicoId: userRecord.medico_id ?? null
    });

    const refreshToken = signRefreshToken({
      id: userRecord.id_user,
      role: userRecord.rol,
      medicoId: userRecord.medico_id ?? null
    });

    // 3. Guardar el refresh token
    await saveRefreshToken(userRecord.id_user, refreshToken);

    // 4. Responder al frontend con TODO lo necesario
    return res.json({
      success: true,
      message: "MFA activado correctamente",
      accessToken, // 👈 Ahora ya existe
      refreshToken,
      user: {
        id: userRecord.id_user,
        name: userRecord.nombre,
        email: userRecord.correo,
        role: userRecord.rol,
        roleLabel: userRecord.rol === 'medico' ? 'Médico' : 'Personal',
        mfa_habilitado: true
      }
    });
  } catch (error) {

    console.error("Error verify MFA:", error);

    return res.status(500).json({
      message: "Error verificando MFA"
    });

  }

};