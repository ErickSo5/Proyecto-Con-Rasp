-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para clinicavictorio
CREATE DATABASE IF NOT EXISTS `clinicavictorio` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `clinicavictorio`;

-- Volcando estructura para tabla clinicavictorio.blog_posts
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(200) NOT NULL,
  `title` varchar(255) NOT NULL,
  `excerpt` text NOT NULL,
  `content` longtext NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `category` varchar(80) NOT NULL,
  `author` varchar(150) NOT NULL,
  `author_role` varchar(150) DEFAULT NULL,
  `author_image` varchar(255) DEFAULT NULL,
  `published_at` date DEFAULT NULL,
  `read_time` varchar(40) DEFAULT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla clinicavictorio.blog_posts: ~0 rows (aproximadamente)

-- Volcando estructura para tabla clinicavictorio.catalog_items
CREATE TABLE IF NOT EXISTS `catalog_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(200) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `long_description` text DEFAULT NULL,
  `category` enum('servicios','productos') NOT NULL,
  `price` varchar(60) DEFAULT NULL,
  `duration` varchar(40) DEFAULT NULL,
  `rating` decimal(3,1) DEFAULT NULL,
  `reviews` int(11) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `in_stock` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla clinicavictorio.catalog_items: ~0 rows (aproximadamente)

-- Volcando estructura para tabla clinicavictorio.citas
CREATE TABLE IF NOT EXISTS `citas` (
  `id_cita` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `Num_trabajador` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `motivo` varchar(255) DEFAULT NULL,
  `estado` enum('agendada','cancelada','finalizada') DEFAULT 'agendada',
  PRIMARY KEY (`id_cita`),
  UNIQUE KEY `unique_cita_medico_fecha_hora` (`Num_trabajador`,`fecha`,`hora`),
  KEY `fk_cita_usuario` (`id_user`),
  CONSTRAINT `fk_cita_medico` FOREIGN KEY (`Num_trabajador`) REFERENCES `medicos` (`Num_trabajador`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cita_usuario` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla clinicavictorio.citas: ~1 rows (aproximadamente)
INSERT INTO `citas` (`id_cita`, `id_user`, `Num_trabajador`, `fecha`, `hora`, `motivo`, `estado`) VALUES
	(1, 1, 1002, '2026-01-28', '11:00:00', 'dada', 'agendada');

-- Volcando estructura para tabla clinicavictorio.conversaciones
CREATE TABLE IF NOT EXISTS `conversaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `category` enum('doctor','admin','support') NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `contact_name` varchar(150) NOT NULL,
  `contact_avatar` varchar(255) DEFAULT NULL,
  `contact_role` varchar(120) DEFAULT NULL,
  `contact_specialty` varchar(120) DEFAULT NULL,
  `last_message` text DEFAULT NULL,
  `last_message_at` datetime DEFAULT NULL,
  `unread_count` int(11) NOT NULL DEFAULT 0,
  `is_pinned` tinyint(1) NOT NULL DEFAULT 0,
  `is_archived` tinyint(1) NOT NULL DEFAULT 0,
  `is_online` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_conversacion_usuario` (`user_id`),
  CONSTRAINT `fk_conversacion_usuario` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla clinicavictorio.conversaciones: ~0 rows (aproximadamente)

-- Volcando estructura para tabla clinicavictorio.conversation_messages
CREATE TABLE IF NOT EXISTS `conversation_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `conversation_id` int(11) NOT NULL,
  `sender_role` enum('cliente','doctor','admin','support') NOT NULL,
  `content` text NOT NULL,
  `status` enum('sent','delivered','read') DEFAULT 'sent',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_message_conversation` (`conversation_id`),
  CONSTRAINT `fk_message_conversation` FOREIGN KEY (`conversation_id`) REFERENCES `conversaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla clinicavictorio.conversation_messages: ~0 rows (aproximadamente)

-- Volcando estructura para tabla clinicavictorio.medicos
CREATE TABLE IF NOT EXISTS `medicos` (
  `Num_trabajador` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `especialidad` varchar(100) NOT NULL,
  `telefono` int(10) NOT NULL,
  PRIMARY KEY (`Num_trabajador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla clinicavictorio.medicos: ~3 rows (aproximadamente)
INSERT INTO `medicos` (`Num_trabajador`, `Nombre`, `especialidad`, `telefono`) VALUES
	(1001, 'Dr. Adrian Castillo', 'Medicina General', 555),
	(1002, 'Dra. Sofia Rios', 'Cardiologia', 555),
	(1003, 'Dr. Mateo Ibarra', 'Pediatria', 555);

-- Volcando estructura para tabla clinicavictorio.password_reset_tokens
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `token_hash` char(64) NOT NULL,
  `expires_at` datetime NOT NULL,
  `used_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_hash` (`token_hash`),
  KEY `fk_reset_usuario` (`id_user`),
  CONSTRAINT `fk_reset_usuario` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla clinicavictorio.password_reset_tokens: ~9 rows (aproximadamente)
INSERT INTO `password_reset_tokens` (`id`, `id_user`, `token_hash`, `expires_at`, `used_at`, `created_at`) VALUES
	(1, 1, '2e08e4f7f1f3ec2433b8feaa03b9ba9a413cb42f8277391d422e043cb6ed2420', '2026-01-26 22:31:09', '2026-01-27 09:04:09', '2026-01-26 21:31:09'),
	(2, 1, '5042ab17945a94ce967d13b69099d0bd07439e448b26bce780de5880753fecd1', '2026-01-27 10:04:09', '2026-01-27 12:15:46', '2026-01-27 09:04:09'),
	(3, 2, 'f460b19f2732c0b276913d3291afb967ebb31aef4a278e2dee213d7d31cc87b6', '2026-01-27 10:14:19', '2026-01-27 09:14:29', '2026-01-27 09:14:19'),
	(4, 2, '734ef4393ddc4c0ee2a6c84e071452d33e154136bce225598d8c503f83210ce6', '2026-01-27 10:14:29', NULL, '2026-01-27 09:14:29'),
	(5, 1, 'f5106e69e9b3070c00de504953a498488b07151ad55a4e72f69e3d0cfe3f3fde', '2026-01-27 13:15:46', '2026-01-27 13:14:40', '2026-01-27 12:15:46'),
	(6, 1, '1097ce50c3279049eb72bfe6095a83e1746309c7b52634f7834592a88dfe9fc3', '2026-01-27 14:14:40', '2026-01-27 13:16:38', '2026-01-27 13:14:40'),
	(7, 1, '5ead4fe69c61e1b925f7752a8c612ed3d5154c7179a52e88d898694e1f297ce7', '2026-01-27 14:16:38', '2026-01-27 13:23:22', '2026-01-27 13:16:38'),
	(8, 4, '32dabeb155a7b10319c77ce050577ba2f12229a8668755d0277b7614ce172f7e', '2026-01-27 14:16:40', NULL, '2026-01-27 13:16:40'),
	(9, 1, 'b899dd1b1fe5c952e03de4060a334e45807ccb64c277ef237d17f290fcd1fd5c', '2026-01-27 14:23:22', '2026-01-27 13:25:01', '2026-01-27 13:23:22');

-- Volcando estructura para tabla clinicavictorio.soporte_mensajes
CREATE TABLE IF NOT EXISTS `soporte_mensajes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `asunto` varchar(150) NOT NULL,
  `mensaje` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla clinicavictorio.soporte_mensajes: ~0 rows (aproximadamente)

-- Volcando estructura para tabla clinicavictorio.soporte_tickets
CREATE TABLE IF NOT EXISTS `soporte_tickets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `status` enum('abierto','en_progreso','resuelto') DEFAULT 'abierto',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_ticket_usuario` (`user_id`),
  CONSTRAINT `fk_ticket_usuario` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla clinicavictorio.soporte_tickets: ~0 rows (aproximadamente)

-- Volcando estructura para tabla clinicavictorio.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` int(10) NOT NULL,
  `rol` enum('cliente','medico','enfermero','admin','direccion') 
  NOT NULL DEFAULT 'cliente',
  `medico_id` int(11) DEFAULT NULL,
  `ultima_autenticacion` datetime DEFAULT NULL,
  /* MFA */
  `mfa_habilitado` boolean DEFAULT FALSE,
  /* TOTP */
  `totp_secret` varchar(255) DEFAULT NULL,
  /* BIOMETRIA */
  `webauthn_id` varchar(255) DEFAULT NULL,
  `webauthn_public_key` text DEFAULT NULL,
  `webauthn_counter` int DEFAULT 0,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `correo` (`correo`),
  KEY `fk_usuario_medico` (`medico_id`),
  CONSTRAINT `fk_usuario_medico`
  FOREIGN KEY (`medico_id`)
  REFERENCES `medicos` (`Num_trabajador`)
  ON DELETE SET NULL
  ON UPDATE CASCADE
) ENGINE=InnoDB 
AUTO_INCREMENT=7 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla clinicavictorio.usuario: ~6 rows (aproximadamente)
INSERT INTO `usuario` (`id_user`, `correo`, `contrasena`, `nombre`, `telefono`, `rol`, `medico_id`) VALUES
	(1, 'mgmoca1@outlook.com', '$2b$12$XRF9IC9XwzRJNpV4GouyJeYBjf2cbqvYzRuo4go2PSqpzAkpkY.16', 'Juan Mario Morales Castellanos', 2147483647, 'cliente', NULL),
	(2, 'no-reply@test-r6ke4n1jmdvgon12.mlsender.net', '$2b$12$XQK8DwP.GbpCKBDUhkc1w.Spyg8aObiggS6tNuoxUEbq3VPhFeutS', 'Jose Castañeda Lopez', 0, 'cliente', NULL),
	(3, 'juan@gmail.com', '$2b$12$bVfsW7joGNdkKLHrmXyzE.6AtMahzTv04Pc9HEyWkSpYkBiA6XDru', 'Juan Perez Gomez', 0, 'cliente', NULL),
	(4, 'medico1@clinicavictorio.com', '$2b$12$yhIpGT8MaZZ./HZ1v34f3OjzmP8TwwcV.w46yVLvD2RmRla5NduHW', 'Dr. Adrian Castillo', 555, 'medico', 1001),
	(5, 'medico2@clinicavictorio.com', '$2b$12$yhIpGT8MaZZ./HZ1v34f3OjzmP8TwwcV.w46yVLvD2RmRla5NduHW', 'Dra. Sofia Rios', 555, 'medico', 1002),
	(6, 'medico3@clinicavictorio.com', '$2b$12$yhIpGT8MaZZ./HZ1v34f3OjzmP8TwwcV.w46yVLvD2RmRla5NduHW', 'Dr. Mateo Ibarra', 555, 'medico', 1003);

-- --------------------------------------------------------
-- Usuarios de prueba para MFA y login
-- Contraseña: Test1234
-- Hash bcrypt: $2b$12$wF4p8YF3dXKQ6o6z5UoV6Ov5JykN3FGB7rjL95eD2C6xHidGdG1nK
-- --------------------------------------------------------

INSERT INTO `usuario` (`correo`, `contrasena`, `nombre`, `telefono`, `rol`, `medico_id`)
VALUES
('testcliente1@clinicavictorio.com', '$2b$12$wF4p8YF3dXKQ6o6z5UoV6Ov5JykN3FGB7rjL95eD2C6xHidGdG1nK', 'Cliente Test 1', 1234567890, 'cliente', NULL),
('testcliente2@clinicavictorio.com', '$2b$12$wF4p8YF3dXKQ6o6z5UoV6Ov5JykN3FGB7rjL95eD2C6xHidGdG1nK', 'Cliente Test 2', 1234567891, 'cliente', NULL),
('testcliente3@clinicavictorio.com', '$2b$12$wF4p8YF3dXKQ6o6z5UoV6Ov5JykN3FGB7rjL95eD2C6xHidGdG1nK', 'Cliente Test 3', 1234567892, 'cliente', NULL),
('testmedico1@clinicavictorio.com', '$2b$12$wF4p8YF3dXKQ6o6z5UoV6Ov5JykN3FGB7rjL95eD2C6xHidGdG1nK', 'Dr. Test Medico 1', 5551112222, 'medico', 1001),
('testmedico2@clinicavictorio.com', '$2b$12$wF4p8YF3dXKQ6o6z5UoV6Ov5JykN3FGB7rjL95eD2C6xHidGdG1nK', 'Dr. Test Medico 2', 5551113333, 'medico', 1002),
('testmedico3@clinicavictorio.com', '$2b$12$wF4p8YF3dXKQ6o6z5UoV6Ov5JykN3FGB7rjL95eD2C6xHidGdG1nK', 'Dra. Test Medico 3', 5551114444, 'medico', 1003),
('testadmin1@clinicavictorio.com', '$2b$12$wF4p8YF3dXKQ6o6z5UoV6Ov5JykN3FGB7rjL95eD2C6xHidGdG1nK', 'Admin Test 1', 1231231234, 'admin', NULL),
('testadmin2@clinicavictorio.com', '$2b$12$wF4p8YF3dXKQ6o6z5UoV6Ov5JykN3FGB7rjL95eD2C6xHidGdG1nK', 'Admin Test 2', 1231231235, 'admin', NULL),
('testdireccion@clinicavictorio.com', '$2b$12$wF4p8YF3dXKQ6o6z5UoV6Ov5JykN3FGB7rjL95eD2C6xHidGdG1nK', 'Dirección Test', 1231231236, 'direccion', NULL);
-- Volcando estructura para tabla clinicavictorio.revoked_tokens
-- Tabla para almacenar tokens revocados (para logout)
CREATE TABLE IF NOT EXISTS `revoked_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` text NOT NULL,
  `token_type` enum('access','refresh') NOT NULL,
  `expires_at` datetime NOT NULL,
  `revoked_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_revoked_expires` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando estructura para tabla clinicavictorio.refresh_tokens
-- Tabla para almacenar refresh tokens válidos
CREATE TABLE IF NOT EXISTS `refresh_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` text NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_refresh_user` (`user_id`),
  KEY `idx_refresh_expires` (`expires_at`),
  CONSTRAINT `fk_refresh_user` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `password_history` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT `fk_password_history_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `usuario` (`id_user`)
    ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
