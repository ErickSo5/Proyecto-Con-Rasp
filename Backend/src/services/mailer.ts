import nodemailer from "nodemailer";
import { config } from "../config";

let transporter: nodemailer.Transporter | null = null;

const getTransporter = () => {
  if (transporter) return transporter;

  // En desarrollo, si no hay config de correo, usar modo console.log
  if (!config.mail.host || !config.mail.user || !config.mail.pass) {
    console.warn("⚠️ Configuración de correo incompleta. Usando modo desarrollo (console.log)");
    return null;
  }

  transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: config.mail.secure,
    auth: {
      user: config.mail.user,
      pass: config.mail.pass,
    },
  });

  return transporter;
};

export const sendPasswordResetEmail = async (to: string, code: string) => {
  const mailer = getTransporter();

  // En desarrollo sin config de correo, imprimir en consola
  if (!mailer) {
    console.log(`
    ========================================
    📧 CORREO DE RECUPERACIÓN (MODO DESARROLLO)
    ========================================
    Para: ${to}
    Código: ${code}
    Expira en: ${config.reset.tokenTtlMinutes} minutos
    ========================================
    `);
    return;
  }

  const subject = "Codigo de recuperacion de contrasena";
  const text =
    `Hola,\n\nRecibimos una solicitud para restablecer tu contrasena.\n` +
    `Si no fuiste tu, puedes ignorar este correo.\n\n` +
    `Tu codigo de recuperacion es: ${code}\n\n` +
    `Este codigo expira en ${config.reset.tokenTtlMinutes} minutos.`;

  const html = `
    <p>Hola,</p>
    <p>Recibimos una solicitud para restablecer tu contrasena.</p>
    <p>Si no fuiste tu, puedes ignorar este correo.</p>
    <p>Tu codigo de recuperacion es:</p>
    <p style="font-size: 20px; font-weight: bold; letter-spacing: 2px;">${code}</p>
    <p>Este codigo expira en ${config.reset.tokenTtlMinutes} minutos.</p>
  `;

  await mailer.sendMail({
    from: config.mail.from,
    to,
    subject,
    text,
    html,
  });
};

