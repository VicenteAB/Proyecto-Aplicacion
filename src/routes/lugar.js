const express = require('express')
const router = express.Router()

/**
 * Instanciación del controlador necesario para los respectivos enrutamientos
 */
const authController = require('../controller/authController')

/**
 * Conexión con la base de datos
 */
const conexion = require('../database/db')

/** 
 * @name mapa
 * @path {GET} /lugares
 *  Ruta del mapa que se encarga de mostrar los lugares turisticos
 *  Metodo que renderiza el mapa y muestra los lugares existentes desde la base de datos.
 *  return Vista mapa
 */
router.get('/lugares', authController.estaAutenticado, (req, res) => {
    conexion.query('SELECT a.id_lugar,a.img_lugar,b.url_mapa FROM lugar a,mapa b WHERE a.id_mapa=b.id_mapa', (error, resultado)=>{
        if(error){
            throw error
        } else {                                                   
           return res.render('mapa', {resultado, resultado})         
        }   
    })
})

/**
 *  @name comentarios
 *  @path {GET} /lugar/comentarios/:id
 *  Ruta de los comentarios realizados al lugar
 *  Metodo que renderiza los datos del lugar y muestra los comentarios realizados por los usuarios
 *  @param {String} id_lugar contiene los parámetros de ruta de un lugar 
 *  return vista comentarios
 */
router.get('/lugar/comentarios/:id', authController.estaAutenticado, (req,res, id_lugar)=>{    
    
    id_lugar = req.params.id; 
    lugar = 'SELECT a.id_reseña,a.contenido,a.estrellas, b.nombre_usuario, b.img_usuario ,c.id_lugar, c.nombre_lugar, c.img_lugar, c.direccion_lugar FROM reseña a,usuario b,lugar c WHERE a.id_usuario=b.id_usuario AND a.id_lugar=c.id_lugar AND c.id_lugar=?'

    conexion.query(lugar, [id_lugar] , (error, resultado) => {
        if (error) {
            throw error;
        }else{           
            return res.render('comentarios', {resultado,resultado})       
        }        
    })

})

module.exports = router