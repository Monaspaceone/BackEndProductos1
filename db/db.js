require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'monacoa1',
    database: process.env.DB_NAME || 'tienda_ropa5'
});

// Chequear si funciona la conexión
connection.connect((err) => {
    if (err) {
        console.error("Error conectando a la base de datos:", err);
        return;
    }
    console.log("Conectado a la base de datos");

    // Asegurar la existencia de la base de datos
    connection.query('CREATE DATABASE IF NOT EXISTS tienda_ropa5', (err, results) => {
        if (err) {
            console.error("Error creando la base de datos:", err);
            return;
        }
        console.log("Base de datos asegurada");

        connection.changeUser({ database: 'tienda_ropa5' }, (err) => {
            if (err) {
                console.error("Error al cambiar a tienda_ropa5:", err);
                return;
            }

            // Crear tabla productos
            const createProductosTableQuery = `
                CREATE TABLE IF NOT EXISTS productos (
                    idProducto INT AUTO_INCREMENT PRIMARY KEY,
                    idMarca INT,
                    producto VARCHAR(100),
                    descripcion TEXT,
                    categoria VARCHAR(100),
                    precio DECIMAL(10, 2),
                    ruta_archivo VARCHAR(200)
                );
            `;
            connection.query(createProductosTableQuery, (err, results) => {
                if (err) {
                    console.error("Error creando la tabla productos:", err);
                    return;
                }
                console.log("Tabla productos asegurada");
            });

            // Crear tabla marcas
            const createMarcasTableQuery = `
                CREATE TABLE IF NOT EXISTS marcas (
                    idMarca INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(100),
                    categorias VARCHAR(100)
                );
            `;
            connection.query(createMarcasTableQuery, (err, results) => {
                if (err) {
                    console.error("Error creando la tabla marcas:", err);
                    return;
                }
                console.log("Tabla marcas asegurada");
            });
        });
    });
});

module.exports = connection;
