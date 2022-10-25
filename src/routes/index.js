const express = require('express')
const router = express.Router()

//controladores necesarios para los enrutamientos
const authController = require('../controller/authController')

//pagina principal
router.get('/', (req, res) => {
    res.render('index')    
})

//pagina al iniciar sesion
router.get('/sesion_iniciada', authController.estaAutenticado, (req, res) => {
    res.render('indexl')
})

module.exports = router