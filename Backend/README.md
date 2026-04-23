# 🚀 API REST con Express, TypeScript, MySQL y JWT

Este proyecto es una **API RESTful** desarrollada con **Express.js**, utilizando **TypeScript** para mejorar la mantenibilidad del código, **MySQL** como sistema de base de datos relacional y **JSON Web Tokens (JWT)** para la autenticación y autorización de usuarios.

El proyecto sigue buenas prácticas de desarrollo backend y está pensado como una base escalable para aplicaciones modernas.

---

## 📌 Tecnologías utilizadas

- Node.js
- Express.js
- TypeScript
- MySQL
- JSON Web Token (JWT)
- bcrypt
- dotenv

---

## 📘 Documentación oficial

La documentación oficial de Express puede consultarse en el siguiente enlace:

https://expressjs.com/es/

---

## 📂 Estructura del proyecto

```txt
src/
├── config/          # Configuración de base de datos y entorno
├── controllers/     # Controladores
├── routes/          # Definición de rutas
├── middlewares/     # Middlewares (JWT, auth, errores)
├── services/        # Lógica reutilizable
├── models/          # Consultas MySQL
├── utils/           # Funciones auxiliares
└── app.ts         # Punto de entrada
