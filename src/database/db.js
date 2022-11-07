const mysql = require('mysql')

/**
 * @method
 * @desc metodo que configura la conexión con la base de datos
 */
const conexion = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    pass : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
})

/**
 * @method
 * @desc metodo que retorna un mensaje al conectar la base de datos con exito
 * o de error en caso de que ocurra algún tipo de error
 */
conexion.connect((error) => {
    if(error){
        console.error('Hay un error en la conexión: ' + error)
        return;
    }else{
        console.log('Se ha conectado exitosamente a la BD')
    }
})

module.exports = conexion