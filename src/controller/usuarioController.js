const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const { promisify } = require('util')
const nodemailer = require('nodemailer')

//registro de usuario
exports.registro = async (req, res) => {
    try {

        const nombre = req.body.nombre
        const email = req.body.correo
        const contraseña = req.body.contraseña
        let passHash = await bcryptjs.hash(contraseña, 10)
        //se le asigna al usuario una imagen por defecto
        const img = "usericon.png"

        conexion.query('INSERT INTO usuario SET ?', {
            nombre_usuario: nombre, email_usuario: email, contraseña_usuario: passHash,
            img_usuario: img
        }, (error, resultado) => {
            manejoError(error, resultado)
        })

    } catch (error) {
        console.error(error)
    }

    //funcion que permite manejar errores al repetir un email ya existente en el registro
    function manejoError(error, resultado){ 
        if (error) {
            console.error(error)
            res.render('registro', {
                alert: true,
                alertMessage: "Este email ya esta en uso!"
            })
        } else {
            res.redirect('/login')
        }    
    }
}


