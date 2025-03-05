import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { fetchProducts } from "./products.js";
import { getProductCards } from "./render.js";

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

// Obtener la autenticación de Firebase
const auth = getAuth(app);

// Función para cerrar sesión
const logout = async () => {
    try {
        await signOut(auth);
        console.log(" ✅ Sesión cerrada correctamente.");
        window.location.href = "/login"; // Redirige al usuario de nuevo al login
    } catch (error) {
        console.error(" ❌ Error al cerrar sesión:", error.message);
    }
};

// Agregar evento al botón de cerrar sesión
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    } else {
        console.warn("No se encontró el botón de logout.");
    }
});

// Cargar productos al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
    const productsContainer = document.getElementById("products-container");

    try {
        const products = await fetchProducts();
        console.log("Productos cargados:", products);

        if (!products || products.length === 0) {
            productsContainer.innerHTML = "<p>No hay productos disponibles.</p>";
            return;
        }

        productsContainer.innerHTML = getProductCards(products);

    } catch (error) {
        console.error(" ❌ Error cargando productos:", error);
        productsContainer.innerHTML = "<p>Hubo un error al cargar los productos.</p>";
    }
});







