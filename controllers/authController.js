// Archivo que contendrá la lógica para manejar las solicitudes de autenticación. 
// Devolverá las respuestas en formato HTML.
// Aquí Cuando un usuario inicie sesión, guardaremos su token en una cookie

const admin = require("firebase-admin");
const firebase = require("firebase/app");
const { getAuth, signInWithCustomToken } = require("firebase/auth");

// Configuración de Firebase para el backend
const firebaseConfig = {
    apiKey: "AIzaSyCRZcIi8vq3aOKp5DvCyOpV0k81nMDZyzw",
    authDomain: "project-break-2-coches.firebaseapp.com",
    projectId: "project-break-2-coches",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// REGISTRO DE USUARIO
const registerUser = async (req, res) => {
    console.log("Datos recibidos en /register:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
        console.error(" ❌ Falta email o password");
        return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    try {
        console.log("Registrando usuario con email:", email);
        const userRecord = await admin.auth().createUser({ email, password });
        console.log(" ✅ Usuario creado en Firebase con UID:", userRecord.uid);

        const customToken = await admin.auth().createCustomToken(userRecord.uid);
        console.log("🔑 Custom Token generado:", customToken);

        const userCredential = await signInWithCustomToken(auth, customToken);
        const idToken = await userCredential.user.getIdToken();
        console.log("🔐 ID Token generado correctamente:", idToken);

        return res.status(201).json({ 
            message: " ✅ Usuario registrado y autenticado exitosamente", 
            idToken 
        });

    } catch (error) {
        console.error(" ❌ Error en el registro de usuario:", error.message);

        // Manejar error específico de email duplicado
        if (error.message.includes("The email address is already in use")) {
            return res.status(400).json({ 
                message: "El email ya está en uso. Por favor, usa otro." 
            });
        }

        // Error genérico
        return res.status(400).json({ 
            message: " ❌ Error al registrar usuario", 
            error: error.message 
        });
    }
};

// INICIO DE SESIÓN
const loginUser = async (req, res) => {
    const { idToken } = req.body; // Aquí debe llegar el ID token desde el frontend

    if (!idToken) {
        return res.status(400).json({ message: "Token no recibido" });
    }

    try {
        // Verificar el ID token de Firebase (NO custom token)
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;

        res.cookie("token", idToken, { httpOnly: true, secure: true });
        res.status(200).json({ message: "Inicio de sesión exitoso", token: idToken });
    } catch (error) {
        res.status(401).json({ message: "Error al iniciar sesión", error: error.message });
    }
};

// CIERRE DE SESIÓN
const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Cierre de sesión exitoso" });
};

// GENERAR ID TOKEN PARA UN USUARIO REGISTRADO
const generateIdToken = async (req, res) => {
    const { customToken } = req.body;

    if (!customToken) {
        return res.status(400).json({ message: "Token personalizado no recibido" });
    }

    try {
        // Iniciar sesión con el custom token para obtener un ID token
        const userCredential = await signInWithCustomToken(auth, customToken);
        const idToken = await userCredential.user.getIdToken();

        res.json({ message: "ID Token generado con éxito", idToken });
    } catch (error) {
        res.status(401).json({ message: "Error al generar el ID Token", error: error.message });
    }
};

// Exportar las funciones
module.exports = { registerUser, loginUser, logoutUser, generateIdToken };
