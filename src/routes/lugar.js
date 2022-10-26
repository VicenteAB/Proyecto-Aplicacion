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
            throw error
        } else {                                                   
            res.render('mapa', {resultado, resultado})         
        }   
    })
})

//pagina que muestra el lugar turistico
router.get('/lugar/comentarios/:id', authController.estaAutenticado, (req,res)=>{    
    
    const id_lugar = req.params.id; 
    const lugar = 'SELECT a.id_reseña,a.contenido,a.estrellas, b.nombre_usuario, b.img_usuario ,c.id_lugar, c.nombre_lugar, c.img_lugar, c.direccion_lugar FROM reseña a,usuario b,lugar c WHERE a.id_usuario=b.id_usuario AND a.id_lugar=c.id_lugar AND c.id_lugar=?'

    conexion.query(lugar, [id_lugar] , (error, resultado) => {
        if (error) {
            throw error;
        }else{           
            res.render('comentarios', {resultado,resultado})       
        }        
    })

})

module.exports = router