document.getElementById("createCarForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;
    const price = parseFloat(document.getElementById("price").value);
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const specifications = document.getElementById("specifications").value.trim();
    const imageFile = document.getElementById("image").files[0];

    if (!imageFile || !name || !brand || !model || !price || !category || !description) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("specifications", specifications);
    if (imageFile) {
        formData.append("image", imageFile);
    }

    try {
        const response = await fetch("http://localhost:3000/api/products", {
            method: "POST",
            body: formData
        });

        if (!response.ok) throw new Error("Error al crear el producto");

        const result = await response.json();
        console.log("✅ Producto creado:", result);

        alert("✅ Producto creado con éxito.");
        window.location.href = "/views/dashboard.html";
    } catch (error) {
        console.error("❌ Error en la creación del producto:", error);
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "❌ Error al crear el producto. Inténtalo de nuevo.";
    }
});


