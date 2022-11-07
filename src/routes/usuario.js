const express = require('express')
const router = express.Router()

/**
 * Instanciación del controlador necesario para los respectivos enrutamientos
 */
const usuarioController = require('../controller/usuarioController')

/**
 * Instanciación del controlador necesario para los respectivos enrutamientos
 */
const authController = require('../controller/authController')

/**
 *  @name login
 *  @path {GET} /login
 *  Ruta para realizar el login
 *  Metodo que renderiza el login
 *  return Vista de login
 */
router.get('/login', (req, res) => {
   return res.render('login', {alerta:false}) 
})

/**
 *  @name registro
 *  @path {GET} /registro
 *  Ruta para realizar el registro de usuarios
 *  Metodo que renderiza el registro
 *  return Vista de registro
 */
router.get('/registro', (req, res) => {
   return res.render('registro', {alerta:false}) 
})

/**
 *  @name registro
 *  @path {POST} /registro
 *  Ruta que utiliza el metodo post que crea al nuevo usuario
 */
router.post('/registro', usuarioController.registro)

/**
 *  @name login
 *  @path {POST} /login
 *  Ruta que utiliza el metodo post que loguea al usuario
 */
router.post('/login', authController.login)

/**
 *  @name logout
 *  @path {GET} /logout
 *  Ruta que utiliza el metodo post que cierra la sesión del usuario
 */
router.get('/logout', authController.logout)


module.exports = router