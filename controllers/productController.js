// Archivo que contendrá la lógica para manejar las solicitudes CRUD de los productos. 
// Devolverá las respuestas en formato HTML.

const Product = require('../models/Product');

// Obtener todos los productos

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo productos", error });
    }
};

// Obtener un producto por ID

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: " ❌ Producto no encontrado" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(" ❌ Error obteniendo el producto:", error);
        res.status(500).json({ message: "Error obteniendo el producto", error });
    }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const imageUrl = req.file ? `/img/${req.file.filename}` : null;

        const newProduct = new Product({
            name: req.body.name,
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            specifications: req.body.specifications,
            image: imageUrl,
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("❌ Error al crear producto:", error);
        res.status(500).json({ message: "Error al crear producto", error });
    }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
    try {
        const updatedData = {
            name: req.body.name,
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            specifications: req.body.specifications, 
        };

        if (req.file) {
            updatedData.image = `/img/${req.file.filename}`;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(" ❌ Error actualizando producto:", error);
        res.status(500).json({ message: "Error actualizando producto", error });
    }
};


// Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });

        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("❌ Error eliminando producto:", error);
        res.status(500).json({ message: "Error eliminando producto", error });
    }
};

