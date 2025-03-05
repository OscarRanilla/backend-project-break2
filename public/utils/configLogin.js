// Configuración del Login en Frontend 

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Las SDKs son todas las herramientas que tiene Firebase para
// poder configurar este login de usuario y en general las 
// herramientas necesarias para poder configurar verificaciones
// de usuario --> es lo que hace el login
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyCRZcIi8vq3aOKp5DvCyOpV0k81nMDZyzw",
    authDomain: "project-break-2-coches.firebaseapp.com",
    projectId: "project-break-2-coches",
    storageBucket: "project-break-2-coches.firebasestorage.app",
    messagingSenderId: "568246903779",
    appId: "1:568246903779:web:e2b88afb6cc972e84eb6d6",
    measurementId: "G-VKKZLRM4K1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const login = async (event) => {
    event.preventDefault(); // Evitar recarga de la página

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('mensajeLogin');
    errorMessage.textContent = ""; // Limpiar mensajes previos

    // Validaciones
    if (!email.includes("@") || !email.includes(".")) {
        errorMessage.textContent = "Introduce un email válido.";
        return;
    }

    if (!password) {
        errorMessage.textContent = "Por favor, introduce tu contraseña.";
        return;
    }

    try {
        // Iniciar sesión en Firebase con email y password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();

        console.log("🔑 Token enviado al servidor:", idToken);

        // Enviar el token al backend para iniciar sesión
        const response = await fetch('/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idToken })
        });

        if (!response.ok) {
            throw new Error("Error en la autenticación del backend");
        }

        const data = await response.json();

        // Redirigir al dashboard si el inicio de sesión es exitoso
        if (data.token) {
            window.location.href = "/dashboard";
        } else {
            errorMessage.textContent = "❌ Error en el inicio de sesión. Verifica tus credenciales.";
        }
    } catch (error) {
        console.error(`❌ No se pudo iniciar sesión: ${error.message}`);
        errorMessage.textContent = "❌ Error en el inicio de sesión. Intenta nuevamente.";
    }
};

// Asignar evento al formulario de login
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", login);
    }
});


