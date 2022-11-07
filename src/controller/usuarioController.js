const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')

/**
 * @method
 * @desc Metodo que recibe los datos ingresados por
 * el usuario para luego ser guardados en la base de datos
 */
exports.registro = async (req, res) => {
    try {

        const nombre = req.body.nombre
        const email = req.body.correo
        const contraseña = req.body.contraseña
        let passHash = await bcryptjs.hash(contraseña, 10)
        //se le asigna al usuario una imagen por defecto
        const img = "usericon.png"
        //se le asigna un rol al usuario por defecto
        const rol = '2'

        conexion.query('INSERT INTO usuario SET ?', {
            nombre_usuario: nombre, email_usuario: email, contraseña_usuario: passHash,
            img_usuario: img, id_rol: rol
        }, (error, resultado) => {
            emailUnico(error, resultado)
        })

    } catch (error) {
        console.error(error)
    }

    /**
     * @method
     * @desc Metodo que impide que se ingrese un email ya registrado en la base de datos 
     * caso contrario redirige al login para iniciar sesion
     * @param {Error} error mensaje de error
     */
    function emailUnico(error){ 
        if (error) {
            console.error(error)
            res.render('registro', {
                alerta: true,
                mensaje: "Este email ya esta en uso!"
            })
        } else {
            res.redirect('/login')
        }    
    }
}