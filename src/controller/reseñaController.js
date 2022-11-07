const conexion = require('../database/db')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

/**
 * @method
 * @desc Metodo que recibe los valores ingresados por el usuario
 * para luego ser guardados en la base de datos
 * @param {String} lugar contiene los parámetros de ruta de un lugar
 */
exports.reseña = async (req, res, lugar) => {
    try { 
        const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
        const usuario = decodificada.id_usuario
        const contenido = req.body.comentario
        lugar = req.params.id
        const estrellas = req.body.estrellas

        conexion.query('INSERT INTO reseña SET ?', {
            id_usuario: usuario ,contenido: contenido, id_lugar: lugar,
            estrellas: estrellas
        }, (error, resultado) => {
            errorEnvio(error, resultado, lugar)
        })

    } catch (error) {
        console.error(error)
    }

    /**
     * @method
     * @desc Metodo que se encarga de que en caso de que ocurra algún error 
     * al enviar un comentario el usuario sera redirigido a la pagina principal 
     * caso contrario sera redirigido a la sección de comentarios de dicho lugar
     * @param {Error} error mensaje de error
     * @param {Array} resultado los datos almacenados 
     * @param {integer} lugar id del lugar al que se le desea realizar el comentario
     */
    function errorEnvio(error, resultado, lugar){ 
        if (error) {
            console.error(error)
            res.render('indexl', {
                alerta: true,
                mensaje: "Debe completar todos los campos"
            })
        } else {
            res.redirect('/lugar/comentarios/' + lugar)
        }    
    }
}