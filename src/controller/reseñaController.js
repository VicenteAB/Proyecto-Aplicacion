const conexion = require('../database/db')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

//enviar comentario
exports.reseña = async (req, res) => {
    try {

        const usuario = 1
        const contenido = req.body.comentario
        const lugar = req.params.id
        const estrellas = req.body.estrellas

        conexion.query('INSERT INTO reseña SET ?', {
            id_usuario: usuario  , contenido: contenido, id_lugar: lugar,
            estrellas: estrellas
        }, (error, resultado) => {
            console.log(usuario)
            errorEnvio(error, resultado, lugar)
        })

    } catch (error) {
        console.error(error)
    }

    //Si ocurre algún error al enviar un comentario
    //el usuario sera redirigido a la pagina principal
    //caso contrario sera redirigido a la sección de comentarios de dicho lugar
    function errorEnvio(error, resultado, lugar){ 
        if (error) {
            console.error(error)
            res.render('indexl', {
                alert: true,
                alertMessage: "Error al enviar el comentario"
            })
        } else {
            res.redirect('/lugar/comentarios/' + lugar)
        }    
    }
}