const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const { promisify } = require('util')
const { Router } = require('express')
const router = Router()


/**
 * @method
 * @desc Metodo que recibe los datos ingresados para realizar el login a la pagina,
 * en caso de que el usuario no digite ningún valor en los campos, este sera redirigido al
 * login, lo mismo ocurrira en caso de que digite mal los datos, al iniciar sesión con exito
 * se generara un token de sesión al usuario.
 */
exports.login = async (req, res)=>{
    try {
        const email = req.body.email
        const contraseña = req.body.contraseña       

        if(!email || !contraseña){
            res.render('login',{
                alerta:true,
                mensaje: "ingrese email o contraseña",
                timer: false,
                ruta: 'login'
            })
        }else{
            conexion.query('SELECT * FROM usuario WHERE email_usuario = ?', [email], async function (error, resultado) {
                    if (resultado.length == 0 || !(await bcryptjs.compare(contraseña, resultado[0].contraseña_usuario))) {
                        res.render('login', {
                            alerta: true,
                            mensaje: "Email o contraseña incorrectos",
                            timer: false,
                            ruta: 'login'
                        })
                    } else {
                        const id = resultado[0].id_usuario
                        const usuario = {id_usuario : id}
                        const token = jwt.sign( usuario , process.env.JWT_SECRETO, {
                            expiresIn: process.env.JWT_EXPIRATION_TIME
                        })

                        const cookies = {
                            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        }

                        res.cookie('jwt', token, cookies)
                        res.render('login', {
                            alerta: true,
                            mensaje: "Exito al iniciar sesion",
                            ruta: res.render('indexl')
                        })
                    }
                })
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * @method
 * @desc Metodo que verifica si el usuario esta autenticado en la pagina
 * a traves de su token generado al iniciar sesión, en caso de que el usuario
 * no este autenticado este sera redirigido al login 
 */
exports.estaAutenticado = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM usuario WHERE id_usuario = ?', [decodificada.id_usuario], (error, resultado)=>{
                if(!resultado){return next()}

                row = resultado[0]
                return next()
                
                
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
}

/**
 * @method
 * @desc Metodo que se encarga de limpiar los cookies de sesión
 * para poder efectuar el cierre de sesión del usuario
 */
exports.logout = (req, res)=>{
    res.clearCookie('jwt')   
    return res.redirect('/login')
}