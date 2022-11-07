const express = require('express')
const router = express.Router()

/**
 * Instanciación del controlador necesario para los respectivos enrutamientos
 */
const authController = require('../controller/authController')

/**
 * Instanciación del controlador necesario para los respectivos enrutamientos
 */
const reseñaController = require('../controller/reseñaController')

/**
 * Conexión con la base de datos
 */
const conexion = require('../database/db')

/**
 *  @name mas-comentarios
 *  @path {GET} /lugar/mas_comentarios/:id
 *  Ruta de más comentarios realizados al lugar
 *  Metodo que renderiza y muestra los comentarios realizados por los usuarios
 *  @param {String} id_lugar contiene los parámetros de ruta de un lugar 
 *  return Vista de más-comentarios
 */
router.get('/lugar/mas_comentarios/:id', authController.estaAutenticado, (req,res, id_lugar)=>{    
    
    id_lugar = req.params.id; 
    const lugar = 'SELECT a.id_reseña,a.contenido,a.estrellas, b.nombre_usuario, b.img_usuario ,c.id_lugar, c.nombre_lugar, c.img_lugar, c.direccion_lugar FROM reseña a,usuario b,lugar c WHERE a.id_usuario=b.id_usuario AND a.id_lugar=c.id_lugar AND c.id_lugar=?'

    conexion.query(lugar, [id_lugar] , (error, resultado) => {
        if (error) {
            throw error;
        }else{           
          return  res.render('mas-comentarios', {resultado,resultado})       
        }        
    })

})

/**
 *  @name nuevo-comentario
 *  @path {GET} /lugar/nuevo_comentario/:id
 *  Ruta formulario para un nuevo comentario
 *  @param {String} id_lugar contiene los parámetros de ruta de un lugar 
 *  return vista de nuevo_comentario
 */
router.get('/lugar/nuevo_comentario/:id', authController.estaAutenticado, (req,res, id_lugar)=>{    
    
    id_lugar = req.params.id; 
    conexion.query('SELECT * FROM lugar WHERE id_lugar=?', [id_lugar] , (error, resultado)=>{
        if(error){
            throw error
        } else {                                                   
           return res.render('nuevo-comentario', {resultado, resultado})         
        }   
    })
})

/**
 *  @name comentarios
 *  @path {POST} /lugar/comentarios/:id
 *  Ruta que utiliza el metodo post que guarda el comentario
 */
router.post('/lugar/comentarios/:id', reseñaController.reseña) 

module.exports = router