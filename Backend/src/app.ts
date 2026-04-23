import 'dd-trace/init'; //RASP

import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import medicosRouter from "./routes/medicos";
import citasRouter from "./routes/citas";
import soporteRouter from "./routes/soporte";
import blogRouter from "./routes/blog";
import catalogoRouter from "./routes/catalogo";
import mensajesRouter from "./routes/mensajes";
import { config } from "./config";
import { ensureSchema } from "./db/init";

// MFA ROUTE
import mfaRoutes from "./routes/mfa.routes";

const app = express();



const corsOptions =
  config.cors.origin === "*"
    ? { origin: "*" }
    : { origin: config.cors.origin, credentials: true };

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  const data = JSON.stringify(req.body || {}).toLowerCase();

  if (
    data.includes("<script") ||
    data.includes("select") ||
    data.includes("union") ||
    data.includes(" or ") || 
    data.includes("--") ||
    data.includes("drop") ||
    data.includes("insert")
  ) {
    console.log("ATAQUE DETECTADO:", data);
  }

  next();
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api", medicosRouter);
app.use("/api", citasRouter);
app.use("/api", soporteRouter);
app.use("/api", blogRouter);
app.use("/api", catalogoRouter);
app.use("/api", mensajesRouter);

// MFA
app.use("/api/mfa", mfaRoutes);

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor." });
  }
);

const startServer = async () => {
  try {
    await ensureSchema();
  } catch (error) {
    console.error("No se pudo preparar la base de datos.", error);
  }

  app.listen(config.port, () => {
    console.log(`Servidor corriendo en el puerto ${config.port}`);
  });
};

void startServer();
