// Función para generar el HTML de las tarjetas de productos

import { deleteProduct } from "./products.js";

export function getProductCards(products) {
    return products.map(product => {
        const imageUrl = product.image.startsWith('/img/') ? product.image : `/img/${product.image}`;
        return `
            <div class="product-card">
                <img src="${imageUrl}" alt="${product.name}" style="width: 100%; height: auto; object-fit: cover;">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>${product.price}€</p>
                <a href="/views/productDetail.html?id=${product._id}">Ver detalle</a>
                <button class="delete-btn" data-id="${product._id}">Eliminar</button>
            </div>
        `;
    }).join("");
}

// Manejar evento de eliminar producto
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", async (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const productId = event.target.getAttribute("data-id");

            if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
                try {
                    await deleteProduct(productId);
                    alert("✅ Producto eliminado correctamente.");
                    window.location.reload(); // Recargar el dashboard para reflejar los cambios
                } catch (error) {
                    console.error("❌ Error eliminando el producto:", error);
                    alert("❌ No se pudo eliminar el producto. Intenta nuevamente.");
                }
            }
        }
    });
});