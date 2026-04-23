import speakeasy from "speakeasy";
import QRCode from "qrcode";

export const generateMFASecret = (email: string) => {
  const secret = speakeasy.generateSecret({
    length: 20,
    name: `Clinica:${email}`, // El nombre que aparecerá en la App
    issuer: "ClinicaVictorio"
  });

  return {
    base32: secret.base32,
    otpauth_url: secret.otpauth_url // 👈 Usa esta URL generada por la librería
  };

};

export const generateQR = async (otpauth: string) => {
  return await QRCode.toDataURL(otpauth);
};

export const verifyToken = (secret: string, token: string) => {

  const cleanToken = token.trim();

  return speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token: cleanToken,
    window: 2
  });

};