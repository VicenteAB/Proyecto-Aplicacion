const mysql = require('mysql');

//conexion con la base de datos
const conexion = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    pass : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
});

//manejo de errores al conectar con la base de datos
conexion.connect((error) => {
    if(error){
        console.error('Hay un error en la conexión: ' + error);
        return;
    }else{
        console.log('Se ha conectado exitosamente a la BD');
    }
});

module.exports = conexion;