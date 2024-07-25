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
            const fileTypes = /jpeg|jpg|png|txt/;


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
    const sql = 'SELECT * FROM productos';

    db.query(sql, (err,result) => 
    {
        if(err) 
            throw err;

        res.json(result);
    });
}


const ObtenerProductoPorId = (req, res) =>{
    const {id} = req.params;
    const sql = 'SELECT * FROM productos WHERE idProducto = ?';

    db.query(sql,[id], (err,result) =>
    {
        if(err) throw err;        
        res.json(result);
    });
}


const crearProducto = (req, res) =>
    {
    const {idMarca,producto,descripcion,categoria,precio} = req.body;
    const archivo = req.file? req.file.filename: null;//Obtener el nombre del archivo guardado

    //Crea un registro en la base Productos
    const sql = 'INSERT INTO productos (idMarca, producto, descripcion, categoria, precio, ruta_archivo) VALUES (?,?,?,?,?,?)';

 //   'INSERT INTO usuarios (nombre,apellido,mail, ruta_archivo) VALUES (?,?,?,?)';


 //   db.query(sql,[nombre,descripcion,categoria,temporada,precio,archivo], (err,result) =>
    db.query(sql,[idMarca,producto,descripcion,categoria,precio,archivo], (err,result) =>
    {
        if (err) throw err;

        res.json(
            {
                mensaje : "Producto Creado exitosamente",
                idProducto: result.insertId
            });
    });
}






const ActualizarProducto = (req, res) =>{
    const {id} = req.params;
    const {idMarca,producto,descripcion,categoria,precio} = req.body;


    const sql = 'UPDATE productos SET idMarca = ?, producto = ?, descripcion = ?, categoria = ?, precio = ? WHERE idProducto = ?';
    db.query(sql,[idMarca,producto,descripcion,categoria,precio,id], (err,result) =>
    {
        if(err) throw err;


        res.json(
            {
                mensaje : 'Producto editado exitosamente'
            });
    });


}


const BorrarProducto = (req, res) =>{
    const {id} = req.params;
    const sql  = 'DELETE FROM productos WHERE idProducto= ?';
    db.query(sql,[id],(err,result) =>
    {
        if(err) throw err;


        res.json(
            {
                mensaje: 'Producto eliminado'
            });
    });
};

// lo hice yo para probar, 

const crearMarca = (req, res) =>
    {
    const {nombre, categorias} = req.body;
    
    const sql = 'INSERT INTO Marcas (nombre, categorias) VALUES (?,?)';
 
    db.query(sql,[nombre, categorias], (err,result) =>
    {
        if (err) throw err;

        res.json(
            {
                mensaje : "Marca Creada exitosamente",
                idMarca: result.insertId
            });
    });
}



const ObtenerTodasLasMarcas = (req,res) => 
    {
        const sql = 'SELECT * FROM Marcas';
    
        db.query(sql, (err,result) => 
        {
            if(err) 
                throw err;
    
            res.json(result);
        });
    }
    
    
const ObtenerMarcaPorId = (req, res) =>{
        const {id} = req.params;
        const sql = 'SELECT * FROM Marcas WHERE idMarca = ?';
    
        db.query(sql,[id], (err,result) =>
        {
            if(err) throw err;        
            res.json(result);
        });
    }



//aqui tambien agrego multer para exportar el modulo UPLOAD
module.exports = 
{
    ObtenerTodosLosProductos,
    ObtenerProductoPorId,
    crearProducto,
    ActualizarProducto,
    BorrarProducto,

   ObtenerTodasLasMarcas,
   ObtenerMarcaPorId,
   crearMarca,
    upload
}
