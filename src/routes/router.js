const express = require('express');
const router = express.Router();

//controladores necesarios para los enrutamientos
const usuarioController = require('../controller/usuarioController');
const authController = require('../controller/authController');

//invocar base de datos
const conexion = require('../database/db');

//pagina principal
router.get('/', (req, res) => {
    res.render('index')
});

router.get('/sesion_iniciada', authController.estaAutenticado, (req, res) => {
    res.render('indexl')
});

router.get('/login', (req, res) => {
    res.render('login', {alert:false}) 
});

router.get('/registro', (req, res) => {
    res.render('registro', {alert:false}) 
});

router.post('/registro', usuarioController.registro)
router.post('/login', authController.login)

router.get('/logout', authController.logout)


module.exports = router;