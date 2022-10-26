const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const { promisify } = require('util')
const { Router } = require('express')
const router = Router()


//recibe el email y contraseña para poder realizar el inicio de sesion
exports.login = async (req, res)=>{
    try {
        const email = req.body.email
        const contraseña = req.body.contraseña       

        if(!email || !contraseña){
            res.render('login',{
                alert:true,
                alertMessage: "ingrese email o contraseña",
                timer: false,
                ruta: 'login'
            })
        }else{
            conexion.query('SELECT * FROM usuario WHERE email_usuario = ?', [email], async function (error, resultado) {
                    if (resultado.length == 0 || !(await bcryptjs.compare(contraseña, resultado[0].contraseña_usuario))) {
                        res.render('login', {
                            alert: true,
                            alertMessage: "Email o contraseña incorrectos",
                            timer: false,
                            ruta: 'login'
                        })
                    } else {
                        const id = resultado[0].id
                        const token = jwt.sign({ id_usuario: id }, process.env.JWT_SECRETO, {
                            expiresIn: process.env.JWT_EXPIRATION_TIME
                        })

                        const cookies = {
                            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        }

                        res.cookie('jwt', token, cookies)
                        res.render('login', {
                            alert: true,
                            alertMessage: "Exito al iniciar sesion",
                            ruta: res.redirect('/sesion_iniciada')
                        })
                    }
                })
        }
    } catch (error) {
        console.log(error)
    }
}

//Se encarga de verificar/autenticar, que el usuario haya iniciado sesion
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

//limpia los cookies al cerrar sesión
exports.logout = (req, res)=>{
    res.clearCookie('jwt')   
    return res.redirect('/login')
}