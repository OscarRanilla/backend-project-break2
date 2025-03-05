import { fetchProductById, deleteProduct } from "./products.js";

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) {
        console.error(" ❌ No se encontró el ID del producto en la URL.");
        return;
    }

    try {
        const product = await fetchProductById(productId);
        console.log("Producto obtenido:", product);

        const productDetails = document.getElementById("product-details");

        if (product) {
            // Verifica si la imagen tiene el prefijo '/img/', y usa una imagen predeterminada si no existe
            const imageUrl = product.image && product.image.startsWith('/img/') ? product.image : '/img/placeholder.jpg';

            productDetails.innerHTML = `
                <h2>${product.name}</h2>
                <img src="${imageUrl}" alt="${product.name}" style="width: 100%; height: auto; object-fit: cover; max-height: 350px;">
                <p>Marca: ${product.brand}</p>
                <p>Modelo: ${product.model}</p>
                <p>Precio: ${product.price}€</p>
                <p>Categoría: ${product.category}</p>
                <p>Descripción: ${product.description}</p>
                <p>Especificaciones: ${product.specifications || "No especificado"}</p>
                <button id="edit-btn">Editar Producto</button>
                <button id="delete-btn">Eliminar Producto</button>
            `;

            document.getElementById("edit-btn").addEventListener("click", () => {
                window.location.href = `/views/editProduct.html?id=${product._id}`;
            });

            document.getElementById("delete-btn").addEventListener("click", async () => {
                if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
                    await deleteProduct(product._id);
                    alert(" ✅ Producto eliminado correctamente");
                    window.location.href = "/views/dashboard.html";
                }
            });
        } else {
            productDetails.innerHTML = `<p> ❌ Producto no encontrado.</p>`;
        }
    } catch (error) {
        console.error(" ❌ Error obteniendo el producto:", error);
    }
});

// Función para editar producto (redirección a formulario de edición)
window.editProduct = function(productId) { // Hacemos accesible la función
    window.location.href = `/views/editProduct.html?id=${productId}`;
};
