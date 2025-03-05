// Protegemos las rutas con Firebase
// usamos verifyAuth para proteger rutas que solo los usuarios autenticados pueden usar.

const express = require("express");
const multer = require('multer');
const path = require('path');
const router = express.Router();
const verifyAuth = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");

// Configuración de multer para almacenar imágenes en public/img
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img"); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nombre único con fecha
    },
});

const upload = multer({ storage });

// Rutas CRUD de productos

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", productController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto a obtener
 *     responses:
 *       200:
 *         description: Producto obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", productController.getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               specifications:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       500:
 *         description: Error al crear el producto
 */
router.post("/", verifyAuth, upload.single("image"), productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               specifications:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       404:
 *         description: Producto no encontrado
 */
router.put("/:id", verifyAuth, upload.single("image"), productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/:id", verifyAuth, productController.deleteProduct);

module.exports = router;
