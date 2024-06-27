const db = require('../db/db');

//ACTUALIZACIÓN CON MULTER Y CARPETA PUBLIC (en la base de datos se guarda el path)
const multer = require('multer');
const path = require('path');


//subir archivos

const storage = multer.diskStorage(
    {
        destination: function (req,file,cb){
            cb(null,'uploads/');//Indica la carpeta donde se guardaran los archivos
        },
        filename: function(req,file,cb)
        {
            cb(null,Date.now() + '-' + file.originalname);//nombre del archivo en el disco
        },
        fileFilter: (req,file,cb) =>
        {
            const fileTypes = /jpeg|jpg|png/;


            const mimeType = fileTypes.test(file.mimetype.toLowerCase());


            const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());


       
            if(mimeType && extname)
            {    
                return cb(null,true);
            }
        
        return cb(new Error('Error: Tipo de archivo NO PERMITIDO'), false);
       
        },
        limits:
        {
            fileSize: 100000000
        }

    });

    const upload = multer({storage: storage});




const ObtenerTodosLosProductos = (req,res) => 
{
    const sql = 'SELECT Products1.idProduct as id,' & 
                       'Products1.productName as Nombre,' &
                       'Products1.productName as Nombre,' &
                       'Products1.descripcion as Descripcion,' &
                       'Products1.temporada as Temporada,' &
                       'Products1.basePrice as Precio,' &
                       'Marca.nombre AS Marca' &
                'FROM Products1, Marca' &
                'WHERE Products1.idMarca = Marca.idMarca';

    db.query(sql, (err,result) => 
    {
        if(err) throw err;

        res.json(result);
    });
}


const ObtenerUsuarioPorId = (req, res) =>{
    const {id} = req.params;
    const sql = 'SELECT Products1.idProduct as id,' & 
                       'Products1.productName as Nombre,' &
                       'Products1.descripcion as Descripcion,' &
                       'Products1.temporada as Temporada,' &
                       'Products1.basePrice as Precio,' &
                       'Marca.nombre AS Marca' &
                'FROM Products1, Marca' &
                'WHERE Products1.idMarca = Marca.idMarca AND Products1.idProduct = ?';

    db.query(sql,[id], (err,result) =>
    {
        if(err) throw err;        
        res.json(result);
    });
};


//ESTO SI ES NECESARIO EDITAR CON MULTER

const crearProducto = (req, res) =>{
    const {nombre,apellido,mail} = req.body;
    const archivo = req.file? req.file.filename: null;//Obtener el nombre del archivo guardado

    //Crea un registro en la base Productos
    const sql1 = 'INSERT INTO Products1 (idMarca, productName, descripcion, temporada, basePrice) VALUES (?,?,?,?,?)';

 //   'INSERT INTO usuarios (nombre,apellido,mail, ruta_archivo) VALUES (?,?,?,?)';


    db.query(sql1,[nombre,apellido,mail,archivo], (err,result) =>
    {
        if(err) throw err;


        res.json({
            message : 'Producto Creado exitosamente',
            idProducto: result.insertId
            });
    });
};






const ActualizarUsuario = (req, res) =>{
    const {id} = req.params;
    const {nombre,apellido,mail} = req.body;


    const sql = 'UPDATE usuarios SET nombre = ?, apellido = ?, mail = ? WHERE id = ?';
    db.query(sql,[nombre,apellido,mail,id], (err,result) =>
    {
        if(err) throw err;


        res.json(
            {
                message : 'Usuario editado'
            });
    });


};


const BorrarUsuario = (req, res) =>{
    const {id} = req.params;
    const sql  = 'DELETE FROM usuarios WHERE id= ?';
    db.query(sql,[id],(err,result) =>
    {
        if(err) throw err;


        res.json(
            {
                message: 'Usuario eliminado'
            });
    });
};

//aqui tambien agrego multer para exportar el modulo UPLOAD
module.exports = 
{
    ObtenerTodosLosUsuarios,
    ObtenerUsuarioPorId,
    crearUsuario,
    ActualizarUsuario,
    BorrarUsuario,
    upload
}