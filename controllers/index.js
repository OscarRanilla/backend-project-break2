// Archivo principal que iniciará el servidor Express. 
// Importa las rutas y las usa. También tiene que estar configurado 
// para servir archivos estáticos y para leer el body de las peticiones de formularios.

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const viewRoutes = require("./routes/viewRoutes");
const { swaggerUi, swaggerDocs } = require("./config/swagger");

// Conectar a la base de datos
connectDB();

// MIDDLEWARES
app.use(cors()); // Permitir solicitudes desde cualquier origen
app.use(express.json()); // Parsear JSON
app.use(cookieParser()); // Manejo de cookies
app.use(morgan("dev")); // Log de solicitudes HTTP
app.use(express.urlencoded({ extended: true })); // Parsear solicitudes tipo formulario

// Rutas de API
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
console.log(" ✅ La documentación Swagger está disponible en http://localhost:3000/api-docs");

// Rutas de vistas
app.use("/", viewRoutes);

// Servir archivos estáticos (CSS, imágenes, JS)
app.use(express.static(path.join(__dirname, "public")));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Ocurrió un error interno en el servidor",
    });
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` ✅ Servidor corriendo en http://localhost:${PORT}`));