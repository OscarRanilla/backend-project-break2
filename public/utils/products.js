const API_URL = "http://localhost:3000/api/products";

// Obtener todos los productos
export async function fetchProducts() {
    try {
        console.log("Fetching products from:", API_URL);
        const response = await fetch(API_URL);

        if (!response.ok) throw new Error(`Error al obtener productos: ${response.status}`);
        
        const products = await response.json();
        console.log("Productos cargados:", products);
        return products;
    } catch (error) {
        console.error(" ❌ Error obteniendo productos:", error);
    }
}

// Obtener un producto por ID
export async function fetchProductById(productId) {
    try {
        const response = await fetch(`${API_URL}/${productId}`);
        if (!response.ok) {
            throw new Error("Producto no encontrado");
        }
        return await response.json();
    } catch (error) {
        console.error("❌ Error obteniendo producto:", error);
        return null; // Devuelve null en caso de error
    }
}

// Crear un nuevo producto
export async function createProduct(productData) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        });

        if (!response.ok) throw new Error("Error al crear producto");
        const newProduct = await response.json();
        console.log(" ✅ Producto creado:", newProduct);
        return newProduct;
    } catch (error) {
        console.error(" ❌ Error creando producto:", error);
    }
}

// Actualizar un producto
export async function updateProduct(productId, updatedProduct) {
    try {
        const response = await fetch(`${API_URL}/${productId}`, {
            method: "PUT",
            body: updatedProduct, // Directamente el FormData
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar producto: ${response.statusText}`);
        }

        const updated = await response.json();
        console.log(" ✅ Producto actualizado:", updated);
        return response; // Devuelve la respuesta completa
    } catch (error) {
        console.error(" ❌ Error actualizando producto:", error);
        return null;
    }
}

// Eliminar un producto
export async function deleteProduct(productId) {
    try {
        const response = await fetch(`${API_URL}/${productId}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar producto");
        console.log(" ✅ Producto eliminado correctamente");
    } catch (error) {
        console.error(" ❌ Error eliminando producto:", error);
    }
}
