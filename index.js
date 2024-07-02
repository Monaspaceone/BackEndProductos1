/*--------SERVIDOR ESTATICO CON EXPRESS-------*/
let port = 3000;
const express = require('express');
const app = express();

const path = require('path');

const productosRouter = require('./routes/productos');
app.use(express.json());

app.use('/productos',productosRouter);
//app.use(express.static(path.join(__dirname,'public')));

const marcasRouter = require('./routes/marcas');
app.use(express.json());

app.use('/marcas',marcasRouter);
//app.use(express.static(path.join(__dirname,'public')));



app.get('/', (req,res) => 
    {
        res.send('HOLA DESDE EL PUERTO LOCALHOST:3000');
    });
    

app.listen(port , () => 
{
    console.log(`Servidor ejecutandose en el puerto ${port}`)
});

