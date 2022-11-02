const express = require('express')
const router = express.Router()

//controladores necesarios para los enrutamientos
const usuarioController = require('../controller/usuarioController')
const authController = require('../controller/authController')

//pagina de login
router.get('/login', (req, res) => {
    res.render('login', {alerta:false}) 
})

//pagina para el registro de usuarios
router.get('/registro', (req, res) => {
    res.render('registro', {alerta:false}) 
})

//registra nuevos usuarios a la pagina
router.post('/registro', usuarioController.registro)

//inicio de sesión del usuario
router.post('/login', authController.login)

//cierre de sesión del usuario
router.get('/logout', authController.logout)


module.exports = router