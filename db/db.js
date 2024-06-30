const mySql = require('mysql2');

const connection = mySql.createConnection(
    {
        host : 'localhost',
        user: 'root',
        password : 'norabc22mysql',
        database: 'tienda_ropa'
    });


    connection.connect((err) => 
    {
        if(err)
        {
            console.error("ERROR conectando a la base de datos TIENDA", err);
            return;
        }

        console.log("Conectado EXITOSAMENTE a la base de datos TIENDA");

    });


module.exports = connection;