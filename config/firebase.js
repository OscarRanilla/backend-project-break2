// Archivo que contendrá la configuración de firebase. 
// Deberá inicializar la conexión con firebase.

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount"); // Importamos las credenciales

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

module.exports = admin;
