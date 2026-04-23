import type { RowDataPacket } from "mysql2/promise";
import bcrypt from "bcryptjs";
import { pool } from "../db";

const getColumnNames = async (table: string) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SHOW COLUMNS FROM ${table}`
  );
  return new Set(rows.map((row) => String(row.Field)));
};

const ensureUsuarioColumns = async () => {
  const columns = await getColumnNames("usuario");

  if (!columns.has("contrasena")) {
    const passwordColumn = Array.from(columns).find((name) =>
      name.toLowerCase().startsWith("contras")
    );

    if (passwordColumn) {
      await pool.execute(
        `ALTER TABLE usuario CHANGE \`${passwordColumn}\` contrasena VARCHAR(255) NOT NULL`
      );
    } else {
      await pool.execute(
        "ALTER TABLE usuario ADD COLUMN contrasena VARCHAR(255) NOT NULL"
      );
    }
  }

  if (!columns.has("telefono")) {
    await pool.execute(
      "ALTER TABLE usuario ADD COLUMN telefono VARCHAR(20) NOT NULL DEFAULT ''"
    );
  }

  if (!columns.has("rol")) {
    await pool.execute(
      "ALTER TABLE usuario ADD COLUMN rol ENUM('cliente','medico') NOT NULL DEFAULT 'cliente'"
    );
  }

  if (!columns.has("medico_id")) {
    await pool.execute("ALTER TABLE usuario ADD COLUMN medico_id INT NULL");
  }

  // Agregar columna username si no existe
  if (!columns.has("username")) {
    try {
      await pool.execute("ALTER TABLE usuario ADD COLUMN username VARCHAR(50) NULL");
      await pool.execute("ALTER TABLE usuario ADD UNIQUE INDEX idx_usuario_username (username)");
      console.log("Columna username agregada a la tabla usuario");
    } catch (error) {
      console.log("Error al agregar columna username:", error);
    }
  }

  // Agregar columna ultima_autenticacion si no existe
  if (!columns.has("ultima_autenticacion")) {
    try {
      await pool.execute("ALTER TABLE usuario ADD COLUMN ultima_autenticacion DATETIME NULL");
      console.log("Columna ultima_autenticacion agregada a la tabla usuario");
    } catch (error) {
      console.log("Error al agregar columna ultima_autenticacion:", error);
    }
  }
};

const ensureUsuarioMedicoForeignKey = async () => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT CONSTRAINT_NAME
     FROM information_schema.KEY_COLUMN_USAGE
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'usuario'
       AND COLUMN_NAME = 'medico_id'
       AND REFERENCED_TABLE_NAME = 'medicos'`
  );

  if (rows.length === 0) {
    await pool.execute(
      "ALTER TABLE usuario ADD CONSTRAINT fk_usuario_medico FOREIGN KEY (medico_id) REFERENCES medicos(Num_trabajador) ON DELETE SET NULL ON UPDATE CASCADE"
    );
  }
};

export const ensureSchema = async () => {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS medicos (
      Num_trabajador INT PRIMARY KEY,
      Nombre VARCHAR(100) NOT NULL,
      especialidad VARCHAR(100) NOT NULL,
      telefono VARCHAR(20) NOT NULL
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS usuario (
      id_user INT AUTO_INCREMENT PRIMARY KEY,
      correo VARCHAR(100) NOT NULL UNIQUE,
      contrasena VARCHAR(255) NOT NULL,
      nombre VARCHAR(100) NOT NULL,
      telefono VARCHAR(20) NOT NULL,
      rol ENUM('cliente','medico') NOT NULL DEFAULT 'cliente',
      medico_id INT NULL
    )
  `);

  await ensureUsuarioColumns();

  try {
    await ensureUsuarioMedicoForeignKey();
  } catch (error) {
    console.error("No se pudo crear la relacion usuario-medico.", error);
  }

  const [medicoCountRows] = await pool.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS total FROM medicos"
  );
  const medicoCount = Number(medicoCountRows[0]?.total ?? 0);

  if (medicoCount === 0) {
    await pool.execute(
      `INSERT INTO medicos (Num_trabajador, Nombre, especialidad, telefono)
       VALUES
         (1001, 'Dr. Adrian Castillo', 'Medicina General', '555-0101'),
         (1002, 'Dra. Sofia Rios', 'Cardiologia', '555-0102'),
         (1003, 'Dr. Mateo Ibarra', 'Pediatria', '555-0103')`
    );
  }

  const medicoUsuarios = [
    {
      correo: "medico1@clinicavictorio.com",
      nombre: "Dr. Adrian Castillo",
      telefono: "555-0101",
      medicoId: 1001,
    },
    {
      correo: "medico2@clinicavictorio.com",
      nombre: "Dra. Sofia Rios",
      telefono: "555-0102",
      medicoId: 1002,
    },
    {
      correo: "medico3@clinicavictorio.com",
      nombre: "Dr. Mateo Ibarra",
      telefono: "555-0103",
      medicoId: 1003,
    },
  ];

  const passwordHash = await bcrypt.hash("Medico123", 12);

  for (const medico of medicoUsuarios) {
    const [existing] = await pool.execute<RowDataPacket[]>(
      "SELECT id_user FROM usuario WHERE correo = ?",
      [medico.correo]
    );

    if (existing.length > 0) {
      await pool.execute(
        "UPDATE usuario SET rol = 'medico', medico_id = ? WHERE correo = ?",
        [medico.medicoId, medico.correo]
      );
      continue;
    }

    await pool.execute(
      "INSERT INTO usuario (correo, contrasena, nombre, telefono, rol, medico_id) VALUES (?, ?, ?, ?, 'medico', ?)",
      [medico.correo, passwordHash, medico.nombre, medico.telefono, medico.medicoId]
    );
  }

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS citas (
      id_cita INT AUTO_INCREMENT PRIMARY KEY,
      id_user INT NOT NULL,
      Num_trabajador INT NOT NULL,
      fecha DATE NOT NULL,
      hora TIME NOT NULL,
      motivo VARCHAR(255),
      estado ENUM('agendada', 'confirmada', 'cancelada', 'finalizada') DEFAULT 'agendada',
      notas TEXT NULL,
      CONSTRAINT fk_cita_usuario
        FOREIGN KEY (id_user) REFERENCES usuario(id_user)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
      CONSTRAINT fk_cita_medico
        FOREIGN KEY (Num_trabajador) REFERENCES medicos(Num_trabajador)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
      CONSTRAINT unique_cita_medico_fecha_hora
        UNIQUE (Num_trabajador, fecha, hora)
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id INT AUTO_INCREMENT PRIMARY KEY,
      id_user INT NOT NULL,
      token_hash CHAR(64) NOT NULL UNIQUE,
      expires_at DATETIME NOT NULL,
      used_at DATETIME NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_reset_usuario
        FOREIGN KEY (id_user) REFERENCES usuario(id_user)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS soporte_mensajes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL,
      asunto VARCHAR(150) NOT NULL,
      mensaje TEXT NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS soporte_tickets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NULL,
      subject VARCHAR(255) NOT NULL,
      status ENUM('abierto', 'en_progreso', 'resuelto') DEFAULT 'abierto',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_ticket_usuario
        FOREIGN KEY (user_id) REFERENCES usuario(id_user)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(200) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      excerpt TEXT NOT NULL,
      content LONGTEXT NOT NULL,
      image_url VARCHAR(255) NULL,
      category VARCHAR(80) NOT NULL,
      author VARCHAR(150) NOT NULL,
      author_role VARCHAR(150) NULL,
      author_image VARCHAR(255) NULL,
      published_at DATE NULL,
      read_time VARCHAR(40) NULL,
      featured TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS catalog_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(200) NOT NULL UNIQUE,
      name VARCHAR(150) NOT NULL,
      description TEXT NOT NULL,
      long_description TEXT NULL,
      category ENUM('servicios', 'productos') NOT NULL,
      price VARCHAR(60) NULL,
      duration VARCHAR(40) NULL,
      rating DECIMAL(3,1) NULL,
      reviews INT NULL,
      image_url VARCHAR(255) NULL,
      featured TINYINT(1) NOT NULL DEFAULT 0,
      in_stock TINYINT(1) NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS conversaciones (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NULL,
      category ENUM('doctor', 'admin', 'support') NOT NULL,
      subject VARCHAR(255) NULL,
      contact_name VARCHAR(150) NOT NULL,
      contact_avatar VARCHAR(255) NULL,
      contact_role VARCHAR(120) NULL,
      contact_specialty VARCHAR(120) NULL,
      last_message TEXT NULL,
      last_message_at DATETIME NULL,
      unread_count INT NOT NULL DEFAULT 0,
      is_pinned TINYINT(1) NOT NULL DEFAULT 0,
      is_archived TINYINT(1) NOT NULL DEFAULT 0,
      is_online TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_conversacion_usuario
        FOREIGN KEY (user_id) REFERENCES usuario(id_user)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS conversation_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      conversation_id INT NOT NULL,
      sender_role ENUM('cliente', 'doctor', 'admin', 'support') NOT NULL,
      content TEXT NOT NULL,
      status ENUM('sent', 'delivered', 'read') DEFAULT 'sent',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_message_conversation
        FOREIGN KEY (conversation_id) REFERENCES conversaciones(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )
  `);

  console.log("Base de datos verificada y actualizada correctamente");
};
