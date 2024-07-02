/*const express = require('express');
const router = express.Router();

const productController = require('../controller/productController');




router.get('/', productController.ObtenerTodasLasMarcas);
router.get('/:id', productController.ObtenerMarcaPorId);
router.post('/', productController.crearMarca);