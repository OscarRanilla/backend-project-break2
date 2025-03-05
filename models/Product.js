// Archivo que contendrá la definición del esquema del producto utilizando Mongoose.

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    category: { 
        type: String, 
        required: true,
        enum: ["Eléctricos", "Híbridos", "Gasolina", "Diesel"], // Agregamos Diesel como opción válida
    },
    description: { type: String, required: true },
    specifications: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
