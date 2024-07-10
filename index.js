/*--------SERVIDOR ESTATICO CON EXPRESS-------*/
//let port = 3000;
const express = require('express');
const app = express();

const path = require('path'); //une el dirname con la carpeta public

const productosRouter = require('./routes/productos');

const marcasRouter = require('./routes/marcas');


app.use(express.json());

//estaba comentada la linea de abajo, 
app.use('/productos',productosRouter);

app.use('/marcas', marcasRouter); // Usa el enrutador de marcas


app.use(express.static(path.join(__dirname,'public')));



//AGREGADO DE MULTER
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req,res) => 
    {
        res.send('HOLA DESDE EL PUERTO LOCALHOST:3000');
    });
    

app.listen(port , () => 
{
    console.log(`Servidor ejecutandose en el puerto ${port}`)
});

