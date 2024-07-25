/*--------SERVIDOR ESTATICO CON EXPRESS-------*/
let port = 3000;

//require('dotenv').config(); //AGREGUE ESTO
const express = require('express');
const app = express();

const path = require('path'); //une el dirname con la carpeta public


//AGREGADO DE MULTER
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req,res) => 
    {
        res.send('HOLA DESDE EL PUERTO LOCALHOST:3000');
    });
    

app.listen(port , () => 
{
    console.log(`Servidor ejecutandose en el puerto ${port}`)
});

