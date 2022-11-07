const express = require('express')
const router = express.Router()

/**
 * Instanciación del controlador necesario para los respectivos enrutamientos
 */
const authController = require('../controller/authController')

/**
 * @name index
 * @path {GET} /
 *  Ruta principal de la página 
 *  Metodo que renderiza el index
 *  return vista index
 */
router.get('/', (req, res) => {
    return res.render('index')    
})

/**
 * @name index
 * @path {GET} /sesion_iniciada
 *  Ruta principal de la página al iniciar sesión
 *  Metodo que renderiza el indexl
 *  return vista indexl
 */
router.get('/sesion_iniciada', authController.estaAutenticado, (req, res) => {
    return res.render('indexl')
})

module.exports = router