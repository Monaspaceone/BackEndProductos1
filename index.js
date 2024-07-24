/*--------SERVIDOR ESTATICO CON EXPRESS-------*/
let port = 3000;

//require('dotenv').config(); //AGREGUE ESTO
const express = require('express');
const app = express();

const path = require('path'); //une el dirname con la carpeta public

//agregamos multer
const multer= require('multer');
const storage= multer.diskStorage( //metodo para configurar dnd se van a almacenar los archivos subidos
{
    destination: (req,file,cb)=>
    {
         cb(null, 'upload/'); //null- si el archivo es null o no    uploads- lugar donde se van a guarar las imagens
        
    }, 
    filename: (req,file,cb)=>
    {
        cb(null,Date.now()+ path.extname(file.originalname)); //nod concatena tiempo en el nombre de la imagen
    }
        
        
});


const upload= multer({storage: storage});

                                                      //middleware: se llama entre el pedido y la respuesta
app.post('/upload', upload.single('archivo') ,(req,res)=>    //llamar al middleware de multer
{

 res.send('Archivo subido con exito'); 
});




const productosRouter = require('./routes/productos');

const marcasRouter = require('./routes/marcas');


app.use(express.json());

//estaba comentada la linea de abajo, 
app.use('/productos',productosRouter);

app.use('/marcas', marcasRouter); // Usa el enrutador de marcas


app.use(express.static(path.join(__dirname,'public')));



//AGREGADO DE MULTER
app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.get('/', (req,res) => 
    {
        res.send('HOLA DESDE EL PUERTO LOCALHOST:3000');
    });
    

app.listen(port , () => 
{
    console.log(`Servidor ejecutandose en el puerto ${port}`)
});

