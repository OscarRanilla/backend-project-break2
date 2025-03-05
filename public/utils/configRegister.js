import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Configuración de Firebase
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

// Función para registrar usuarios con validaciones
const register = async (event) => {
    event.preventDefault(); 
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = ""; // Limpiar mensajes previos

    if (!email.includes("@") || !email.includes(".")) {
        errorMessage.textContent = "Por favor, introduce un email válido.";
        return;
    }

    if (password.length < 6) {
        errorMessage.textContent = "La contraseña debe tener al menos 6 caracteres.";
        return;
    }

    try {
        console.log("Enviando datos al backend:", { email, password });
        const response = await fetch('/api/auth/register', {  
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })  
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || " ❌ Error en el registro");
        }

        console.log(" ✅ Registro exitoso. Redirigiendo al login...");
        window.location.href = "/login";

    } catch (error) {
        console.error(" ❌ Error al registrar:", error.message);
        errorMessage.textContent = error.message; // Mostrar mensaje específico del backend
    }
};

// Asignar la función al botón de registro
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", register);
    } else {
        console.error(" ❌ Error: No se encontró el formulario de registro");
    }
});
