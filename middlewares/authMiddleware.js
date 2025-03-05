// Archivo que contendrá el middleware para comprobar si el usuario está autenticado. 
// Este buscará la sesión del usuario y, si no la encuentra, redirigirá al formulario de login.

const admin = require("firebase-admin");

// Middleware para verificar si el usuario está autenticado

// Middleware para verificar si el usuario está autenticado
const verifyAuth = async (req, res, next) => {
    const idTokenCookie = req.cookies.token; // Token en cookie
    const idTokenHeader = req.headers.authorization?.split(" ")[1]; // Token en Header

    const token = idTokenCookie || idTokenHeader; // Usar uno de los dos

    if (!token) {
        return res.status(401).json({ message: "No autorizado, token faltante" });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error(`Error al verificar el token: ${error.message}`);
        res.clearCookie("token");
        return res.status(401).json({ message: "Token inválido o expirado", error: error.message });
    }
};

module.exports = verifyAuth;

