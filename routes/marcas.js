const express = require('express');
const router = express.Router();

const productController = require('../controller/productController');

//ver esto
router.get('/', productController.ObtenerTodasLasMarcas);
router.get('/:id', productController.ObtenerMarcaPorId);

router.post('/', productController.crearMarca);



module.exports = router;