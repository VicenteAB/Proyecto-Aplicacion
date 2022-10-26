const conexion = require('../database/db')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

//enviar comentario
exports.reseña = async (req, res) => {
    try {

        const usuario = 1
        const contenido = req.body.comentario
        const lugar = req.params.id; 
        const estrellas = req.body.estrellas; 

        conexion.query('INSERT INTO reseña SET ?', {
            id_usuario: usuario  , contenido: contenido, id_lugar: lugar,
            estrellas: estrellas
        }, (error, resultado) => {
            console.log(usuario)
            errorMensaje(error, resultado, lugar, usuario)
        })

    } catch (error) {
        console.error(error)
    }

    //funcion que impide que se ingrese un email ya registrado en la base de datos
    //caso contrario redirige al login para iniciar sesion
    function errorMensaje(error, resultado, lugar, usuario){ 
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