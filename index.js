/*--------SERVIDOR ESTATICO CON EXPRESS-------*/
let port = 3000;
const express = require('express');
const app = express();
const path = require('path');
//const usuariosRouter = require('./routes/usuarios');
const usuariosRouter = require('./routes/productos');

app.use(express.json());
app.use('/productos',productosRouter);
app.use(express.static(path.join(__dirname,'public')));



//AGREGADO DE MULTER
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(port , () => 
{
    console.log(`Servidor ejecutandose en el puert ${port}`)
});

