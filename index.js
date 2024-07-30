
/*--------SERVIDOR ESTATICO CON EXPRESS-------*/
let port = 3000;
const express = require('express'); //librería sobre la que vamos a trabajar
const app = express();
const path = require('path');
const productosRouter = require('./routes/productos');
const marcasRouter = require('./routes/marcas');
const multer = require('multer'); // Importar multer

//revisar base de datos para ver si agregue el espacio de las imagenes
// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Indica la carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo en el disco, concatenado,
    },
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use('/productos', productosRouter);
app.use('/marcas', marcasRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta para probar la subida de archivos
//estos son los endpoints
//todo seva a mandar al destination
app.post('/upload', upload.single('archivo'), (req, res) => {
    console.log(req.file); // Agregar log para ver el archivo subido
    if (!req.file) {
        return res.status(400).send('No se ha subido ningún archivo.');
    }
    res.send("archivo subido con éxito");
});
//para subir varios archivos uso ruta y key diferente
//
app.post('/uploads', upload.array('archivos', 10), (req, res)=>
{
    console.log(req.files); // Agregar log para ver los archivos subidos
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No se han subido archivos.');
    }
    res.send('archivos subidos con exito'); 
}); 

app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});
