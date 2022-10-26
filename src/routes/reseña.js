const express = require('express')
const router = express.Router()

//controladores necesarios para los enrutamientos
const authController = require('../controller/authController')
const reseñaController = require('../controller/reseñaController')

//invocar base de datos
const conexion = require('../database/db')

//pagina para ver más comentarios
router.get('/lugar/mas_comentarios/:id', authController.estaAutenticado, (req,res)=>{    
    
    const id_lugar = req.params.id; 
    const lugar = 'SELECT a.id_reseña,a.contenido,a.estrellas, b.nombre_usuario, b.img_usuario ,c.id_lugar, c.nombre_lugar, c.img_lugar, c.direccion_lugar FROM reseña a,usuario b,lugar c WHERE a.id_usuario=b.id_usuario AND a.id_lugar=c.id_lugar AND c.id_lugar=?'

    conexion.query(lugar, [id_lugar] , (error, resultado) => {
        if (error) {
            throw error;
        }else{           
            res.render('mas-comentarios', {resultado,resultado})       
        }        
    })

})

//pagina para añadir nuevos comentarios
router.get('/lugar/nuevo_comentario/:id', authController.estaAutenticado, (req,res)=>{    
    conexion.query('SELECT * FROM lugar', (error, resultado)=>{
        if(error){
            throw error
        } else {                                                   
            res.render('nuevo-comentario', {resultado, resultado})         
        }   
    })
})

router.post('/lugar/comentarios/:id', reseñaController.reseña) 

module.exports = router