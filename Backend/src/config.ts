import dotenv from "dotenv";
import crypto from "crypto";
import fs from "fs";
import path from "path";

dotenv.config();

const env = process.env;

const parseNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const parseBoolean = (value: string | undefined, fallback: boolean) => {
  if (value === undefined) return fallback;
  return value.toLowerCase() === "true";
};

const parseOrigins = (value: string | undefined, fallback: string[] | "*") => {
  if (!value) return fallback;
  if (value.trim() === "*") return "*";
  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
};

const jwtSecret = env.JWT_SECRET ?? "dev_secret_change_me";

if (!env.JWT_SECRET) {
  console.warn("JWT_SECRET no esta definido. Usa un valor seguro en produccion.");
}

// Generar o cargar claves RSA para firma digital
const rsaKeyPath = path.join(__dirname, "../rsa_keys");
let privateKey: string;
let publicKey: string;

if (env.PRIVATE_KEY && env.PUBLIC_KEY) {
  privateKey = env.PRIVATE_KEY;
  publicKey = env.PUBLIC_KEY;
} else {
  // Generar claves si no existen
  if (!fs.existsSync(rsaKeyPath)) {
    fs.mkdirSync(rsaKeyPath, { recursive: true });
  }
  
  const privateKeyPath = path.join(rsaKeyPath, "private.pem");
  const publicKeyPath = path.join(rsaKeyPath, "public.pem");
  
  if (fs.existsSync(privateKeyPath) && fs.existsSync(publicKeyPath)) {
    privateKey = fs.readFileSync(privateKeyPath, "utf8");
    publicKey = fs.readFileSync(publicKeyPath, "utf8");
  } else {
    const { publicKey: pubKey, privateKey: privKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });
    privateKey = privKey;
    publicKey = pubKey;
    fs.writeFileSync(privateKeyPath, privateKey);
    fs.writeFileSync(publicKeyPath, publicKey);
    console.log("Claves RSA generadas para firma digital.");
  }
}

export const config = {
  port: parseNumber(env.PORT, 3000),
  db: {
    host: env.DB_HOST ?? "localhost",
    user: env.DB_USER ?? "root",
    password: env.DB_PASSWORD ?? "",
    name: env.DB_NAME ?? "clinicavictorio",
    port: parseNumber(env.DB_PORT, 3306),
  },
  jwt: {
    secret: jwtSecret,
    // Access token: 10 minutos
    accessExpiresIn: "10m",
    // Refresh token: 7 días
    refreshExpiresIn: "7d",
    // Clave RSA para firma digital
    rsa: {
      privateKey,
      publicKey,
    },
  },
  reset: {
    baseUrl:
      env.RESET_PASSWORD_URL ??
      env.FRONTEND_URL ??
      env.APP_URL ??
      "http://localhost:3000/reset-password",
    tokenTtlMinutes: parseNumber(env.RESET_TOKEN_TTL_MINUTES, 60),
  },
  mail: {
    host: env.MAIL_HOST,
    port: parseNumber(env.MAIL_PORT, 587),
    secure: parseBoolean(env.MAIL_SECURE, false),
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
    from: env.MAIL_FROM ?? "Clinica Victorio <no-reply@clinicavictorio.com>",
  },
  ldap: {
    // Habilitar/deshabilitar autenticación LDAP
    enabled: parseBoolean(env.LDAP_ENABLED, false),
    // Servidor LDAP (ej: ldap://servidor.dominio.com o ldaps://)
    url: env.LDAP_URL ?? "ldap://localhost:389",
    // Base DN para búsqueda de usuarios (ej: dc=dominio,dc=com)
    baseDn: env.LDAP_BASE_DN ?? "dc=example,dc=com",
    // DN del usuario administrador para bind (ej: cn=admin,dc=dominio,dc=com)
    bindDn: env.LDAP_BIND_DN ?? "",
    // Contraseña del administrador
    bindPassword: env.LDAP_BIND_PASSWORD ?? "",
    // Filtro de búsqueda de usuario (ej: (uid={{username}}) o (sAMAccountName={{username}}))
    searchFilter: env.LDAP_SEARCH_FILTER ?? "(uid={{username}})",
    // Atributo del nombre de usuario en LDAP
    usernameAttribute: env.LDAP_USERNAME_ATTR ?? "uid",
    // Atributo del email en LDAP
    emailAttribute: env.LDAP_EMAIL_ATTR ?? "mail",
    // Atributo del nombre completo en LDAP
    nameAttribute: env.LDAP_NAME_ATTR ?? "cn",
  },
  cors: {
    origin: parseOrigins(env.CORS_ORIGIN, ["http://localhost:5173"]),
  },
};
