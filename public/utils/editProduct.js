import { fetchProductById, updateProduct } from "./products.js";

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) {
        alert("No se proporcionó un ID de producto.");
        return; // Salir si no se proporciona un ID
    }

    try {
        // Obtiene los datos del producto a través del ID
        const product = await fetchProductById(productId);
        console.log("Producto obtenido para editar:", product);

        if (!product) {
            alert("Producto no encontrado.");
            return; // Salir si no se encuentra el producto
        }

        // Verificar y llenar el formulario con los datos del producto
        try {
            document.getElementById("name").value = product.name || "";
            document.getElementById("brand").value = product.brand || "";
            document.getElementById("model").value = product.model || "";
            document.getElementById("price").value = product.price || 0;
            document.getElementById("category").value = product.category || "";
            document.getElementById("description").value = product.description || "";
            document.getElementById("specifications").value = product.specifications || "";

            console.log("Formulario cargado correctamente, valores asignados:");
        } catch (error) {
            console.error("❌ Error asignando valores al formulario:", error);
        }

        // Validar el campo product-id
        if (product._id) {
            document.getElementById("product-id").value = product._id;
        } else {
            console.warn("El producto no tiene un _id válido:", product);
        }

        // Manejar el formulario de edición
        document.getElementById("edit-product-form").addEventListener("submit", async (event) => {
            event.preventDefault();

            const updatedProduct = new FormData();
            updatedProduct.append("name", document.getElementById("name").value);
            updatedProduct.append("brand", document.getElementById("brand").value);
            updatedProduct.append("model", document.getElementById("model").value);
            updatedProduct.append("price", parseFloat(document.getElementById("price").value));
            updatedProduct.append("category", document.getElementById("category").value);
            updatedProduct.append("description", document.getElementById("description").value);
            updatedProduct.append("specifications", document.getElementById("specifications").value);

            const imageFile = document.getElementById("image").files[0];
            if (imageFile) {
                updatedProduct.append("image", imageFile);
            }

            // Depuración: Verificar datos enviados al backend
            console.log("Datos que se enviarán al backend:", Object.fromEntries(updatedProduct.entries()));

            try {
                const response = await updateProduct(productId, updatedProduct);

                if (response && response.ok) {
                    alert("✅ Producto actualizado correctamente.");
                    window.location.href = "/views/dashboard.html"; // Redirigir al dashboard
                } else {
                    console.error("❌ Error en la respuesta del servidor:", await response.text());
                    alert("❌ Error en el servidor al actualizar el producto.");
                }
            } catch (error) {
                console.error("❌ Error al intentar actualizar el producto:", error);
                alert("❌ Error inesperado al actualizar el producto. Intenta nuevamente.");
            }
        });
    } catch (error) {
        console.error("❌ Error obteniendo el producto:", error);
        alert("❌ Hubo un problema al cargar el producto. Intenta nuevamente.");
    }
});
