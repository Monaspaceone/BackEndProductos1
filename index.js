/*--------SERVIDOR ESTATICO CON EXPRESS-------*/
let port = 3000;
require('dotenv').config(); //AGREGUE ESTO
const express = require('express');
const app = express();
const path = require('path'); //une el dirname con la carpeta public
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
//estaba comentada la linea de abajo, 
app.use('/productos',productosRouter);
app.use('/marcas', marcasRouter); // Usa el enrutador de marcas
app.use(express.static(path.join(__dirname,'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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


app.get('/', (req,res) => 
    {
        res.send('HOLA DESDE EL PUERTO LOCALHOST:3000');
    });
    

app.listen(port , () => 
{
    console.log(`Servidor ejecutandose en el puerto ${port}`)
});

