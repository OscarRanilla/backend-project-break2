const express = require("express");
const router = express.Router();
const { loginUser, registerUser, logoutUser, generateIdToken } = require("../controllers/authController");
const verifyAuth = require("../middlewares/authMiddleware");

// Rutas de autenticación

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error en los datos proporcionados
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 */
router.post("/logout", logoutUser);

/**
 * @swagger
 * /api/auth/generate-token:
 *   post:
 *     summary: Generar un token de autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *                 description: ID de usuario para generar el token
 *     responses:
 *       200:
 *         description: Token generado correctamente
 *       400:
 *         description: Error al generar el token
 */
router.post("/generate-token", generateIdToken);

/**
 * @swagger
 * /api/auth/check-auth:
 *   get:
 *     summary: Verificar si el usuario está autenticado
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
 *       401:
 *         description: Usuario no autenticado
 */


// Ruta para verificar autenticación

router.get("/check-auth", verifyAuth, (req, res) => {
    res.json({ message: "Usuario autenticado", user: req.user });
});

/**
 * @swagger
 * /api/auth/test:
 *   get:
 *     summary: Verificar el estado del servidor
 *     responses:
 *       200:
 *         description: La ruta está funcionando correctamente
 */
router.get("/test", (req, res) => {
    res.json({ message: "La ruta /api/auth/test está funcionando correctamente" });
});

module.exports = router;




