const express = require('express');
const router = express.Router();

const productController = require('../controller/productController');


router.get('/', productController.ObtenerTodosLosProductos);
router.get('/:id', productController.ObtenerProductoPorId);

//SOLO SE PUEDEN CREAR PRODUCTOS CON MULTER //ES MAS COMPLICADO editar las imagenes
//router.post('/',productController.upload.single('archivo'),productController.crearProducto);
router.post('/', productController.crearProducto);

router.put('/:id', productController.ActualizarProducto);
router.delete('/:id',productController.BorrarProducto);


module.exports = router;