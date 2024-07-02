const mySql = require('mysql2');

const connection = mySql.createConnection(
    {
        host : 'localhost',
        user: 'root',
        password : 'monacoa1',
        //password: 'norabc22mysql',
        database: 'tienda_ropa'
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

       connection.query('CREATE DATABASE IF NOT EXISTS tienda_ropa', (err,results) =>
        {
            if(err)
            {
                console.log("Error creando la base de datos");
                return;
            }


            console.log("Base de datos asegurada");


            connection.changeUser({database : 'tienda_ropa'}, (err)=>
            {
                if(err)
                {
                    console.error("Error al cambiar a tienda_ropa",err);
                    return;
                }



                const createTableQuery = `
                    CREATE TABLE IF NOT EXISTS productos (
                        idProducto INT AUTO_INCREMENT PRIMARY KEY,
                        idMarca INT,
                        producto VARCHAR(100),
                        descripcion TEXT,
                        categoria VARCHAR(1),
                        temporada TINYINT(1),
                        precio DECIMAL(10,2)
                    );            
                `;


                connection.query(createTableQuery,(err,results) =>
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