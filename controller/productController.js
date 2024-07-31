const db = require('../db/db');
//ACTUALIZACIÓN CON MULTER Y CARPETA PUBLIC (en la base de datos se guarda el path)
//importa el modulo multer, el middleware para manejar la subida de archivos 
//importa el modulo path, que proporciona utilidades para trabajar con rutas de archivos y directorios;
const path = require('path');
const multer = require('multer');
//subir archivos
//configura el almacenamiento de archivos con diskstorage
const storage = multer.diskStorage({
    //destination especifica la carpeta dende se guardaran los archivos
           //cb es el coallback que se llama despues de termianr el destination
               //el [primer argumento de cb es para el error]
   
       destination: function (req, file, cb) {
           cb(null,path.join(__dirname, '../uploads')); //carpeta donde se subiran los archivos
       },
      //filename especifica como se nombraran los archivos subidos
           //cb es el callback que se llama despues de determinar el nombre del archivo
       filename: function (req, file, cb) {
           cb(null, Date.now() + '-' + file.originalname);
       // date.now es para asegurar que cada archivo tenga un nombre unico
               //path.extname() obtiene la extension del archivo original
   
       },
       fileFilter: (req, file, cb) => {
           const fileTypes = /jpeg|jpg|png|txt/;
           const mimeType = fileTypes.test(file.mimetype.toLowerCase()); //tipos de archivos
           const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); //si los mimetyoes coinciden con los que estan permitidos, y ponerlos en minuscula
   
           if (mimeType && extname) {
               return cb(null, true);
           }
           return cb(new Error('Error: Tipo de archivo NO PERMITIDO'), false);
       },
       limits: { fileSize: 10000000000 } //tamano max en bytes
   });
   
   const upload = multer({ storage: storage });
       //storage es el almacenamiento cofigurado que hemos definido previamente
       //crea una instacioa de multer con la configuracion de almacenamiento definida
   
   //----fin de multer-----


const ObtenerTodosLosProductos = (req,res) => 
{
    const sql = 'SELECT * FROM productos';

    db.query(sql, (err,result) => 
    {
        if(err) 
            throw err;

        res.json(result);
    });
};


const ObtenerProductoPorId = (req, res) =>{
    const {id} = req.params;
    const sql = 'SELECT * FROM productos WHERE idProducto = ?';

    db.query(sql,[id], (err,result) =>
    {
        if(err) throw err;        
        res.json(result);
    });
};


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
};






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


};


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
};



const ObtenerTodasLasMarcas = (req,res) => 
    {
        const sql = 'SELECT * FROM Marcas';
    
        db.query(sql, (err,result) => 
        {
            if(err) 
                throw err;
    
            res.json(result);
        });
    };
    
    
const ObtenerMarcaPorId = (req, res) =>{
        const {id} = req.params;
        const sql = 'SELECT * FROM Marcas WHERE idMarca = ?';
    
        db.query(sql,[id], (err,result) =>
        {
            if(err) throw err;        
            res.json(result);
        });
    }; 



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
}; 
