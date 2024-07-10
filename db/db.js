require('dotenv').config();
const mySql = require('mysql2');

 const connection = mySql.createConnection(
  /*  {
        host : 'localhost',
        user: 'root',
        password : 'monacoa1',
        //password: 'norabc22mysql',
        database: 'tienda_ropa'
    });
    */

 {
 host: process.env.BD_HOST,
 user: process.env.BD_USER,
 password: process.env.BD_PASSWORD,
 database: process.env.BD_name
  });

//CHEQUEO SI FUNCIONA LA CONEXION

connection.connect((err) =>
    {
        if (err)
            {
                console.error("Error conectando a la base de datos:",err);
                return;
            }
            
       console.log("Conectado a la base de datos");

       connection.query('CREATE DATABASE IF NOT EXISTS sql10718775', (err,results) =>
        {
            if(err)
            {
                console.log("Error creando la base de datos");
                return;
            }


            console.log("Base de datos asegurada");


            connection.changeUser({database : 'sql10718775'}, (err)=>
            {
                if(err)
                {
                    console.error("Error al cambiar a tienda_ropa",err);
                    return;
                }



                const createProductosTableQuery = `
                    CREATE TABLE IF NOT EXISTS productos (
                        idProducto INT AUTO_INCREMENT PRIMARY KEY,
                        idMarca INT,
                        producto VARCHAR(100),
                        descripcion TEXT,
                        categoria VARCHAR(10),
                        precio DECIMAL(10,2)
                    );            
                `;


                connection.query(createProductosTableQuery,(err,results) =>
                {
                    if(err)
                    {
                        console.log("Error creando la tabla: " , err);
                        return;
                    }


                    console.log("Tabla asegurada");
                });
                

                const createMarcasTableQuery = `
                CREATE TABLE IF NOT EXISTS Marcas (
                    idMarca INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(100),
                    categorias VARCHAR(10)
                    
                );            
            `;


            connection.query(createMarcasTableQuery,(err,results) =>
            {
                if(err)
                {
                    console.log("Error creando la tabla: " , err);
                    return;
                }


                console.log("Tabla asegurada");


            });

        });

    });


    }); 

//EXPORTO EL MODULO CONNECTION PARA SER USADO EN OTRO MODULO

module.exports = connection;



 /*   connection.connect((err) => 
    {
        if(err)
        {
            console.error("ERROR conectando a la base de datos TIENDA", err);
            return;
        }

        console.log("Conectado EXITOSAMENTE a la base de datos TIENDA");

    });


module.exports = connection;*/
