const express = require('express');
const admin = require('../config/firebase');
const auth = admin.auth(); 
const verifyAuth = require('../middlewares/authMiddleware');
const path = require('path');
const router = express.Router();

// enviamos un archivo estático como respuesta en la ruta /register
        // __dirname --> es la base de ese archivo
        // "../public/views" --> accede a la carpeta donde están las vistas(views)
        // "register.html" --> la vista que pinta esta ruta en concreto 

/**
 * @swagger
 * /register:
 *   get:
 *     summary: Página de registro de usuarios
 *     responses:
 *       200:
 *         description: Muestra la página de registro
 */
router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views", "register.html"));
});

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Página de inicio de sesión
 *     responses:
 *       200:
 *         description: Muestra la página de inicio de sesión
 */
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views", "login.html"));
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión con un token de Firebase
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: Token de Firebase para iniciar sesión
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       400:
 *         description: Token no proporcionado
 *       401:
 *         description: Token inválido
 */
router.post('/login', async (req, res) => {
    console.log('Datos recibidos en /login:', req.body);

    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ success: false, message: 'Token no recibido' });
    }

    try {
        await auth.verifyIdToken(idToken);
        res.cookie('token', idToken, { httpOnly: true, secure: false });

        // Enviar el token en la respuesta JSON para que el frontend lo reciba
        res.json({ success: true, token: idToken });
    } catch (error) {
        console.log(`Error al verificar el usuario ${error}`);
        res.status(401).json({ success: false, message: 'Token inválido' });
    }
});

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Redireccionar al dashboard
 *     responses:
 *       302:
 *         description: Redirige al archivo HTML del dashboard
 */
router.get("/dashboard", verifyAuth, (req, res) => {
    res.redirect("/views/dashboard.html");
});

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Cerrar sesión del usuario
 *     responses:
 *       302:
 *         description: Redirige al inicio de sesión
 */
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

module.exports = router;