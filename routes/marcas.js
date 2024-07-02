const express = require('express');
const router = express.Router();





router.get('/', productController.ObtenerTodasLasMarcas);
router.get('/:id', productController.ObtenerMarcaPorId);
router.post('/', productController.crearMarca);