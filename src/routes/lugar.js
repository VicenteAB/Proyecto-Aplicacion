const express = require('express')
const router = express.Router()

//controladores necesarios para los enrutamientos
const authController = require('../controller/authController')

//invocar base de datos
const conexion = require('../database/db')

//pagina que muestra el mapa con los lugares turisticos
router.get('/lugares', authController.estaAutenticado, (req, res) => {
    conexion.query('SELECT * FROM lugar', (error, resultado)=>{
        if(error){
            throw error;
        } else {                                                   
            res.render('mapa', {resultado, resultado})         
        }   
    })
})

//pagina que muestra el lugar turistico
router.get('/lugar/comentarios/:id', authController.estaAutenticado, (req,res)=>{    
    const id = req.params.id;    
    conexion.query('SELECT * FROM lugar WHERE id_lugar=?',[id] , (error, resultado) => {
        if (error) {
            throw error;
        }else{            
            res.render('comentarios', {resultado, resultado})           
        }        
    })
})

module.exports = router