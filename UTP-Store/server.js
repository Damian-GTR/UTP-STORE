const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", async (req, res) => {
    try {
        const resultado = await pool.query("SELECT NOW()");
        res.json(resultado.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error conectando a PostgreSQL");
    }
});

// Ruta para obtener productos
app.get("/productos", async (req, res) => {
    try {
        const resultado = await pool.query("SELECT * FROM productos");
        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los productos");
    }
});

// Ruta para obtener un producto por ID
app.get("/productos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);
        if (resultado.rows.length === 0) {
            res.status(404).send("Producto no encontrado");
        } else {
            res.json(resultado.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener el producto");
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});