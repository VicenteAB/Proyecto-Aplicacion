const express = require('express')
var path = require('path')
const app = express()
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/src/views')
app.use(express.static(__dirname + '/src/public/'))

app.set('port', process.env.PORT || 4000)

dotenv.config({path: './src/env/.env'})

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

//importar las rutas
app.use('/', require('./src/routes/lugar'))
app.use('/', require('./src/routes/usuario'))
app.use('/', require('./src/routes/index'))
app.use('/', require('./src/routes/reseña'))


//limpiar cache
app.use(function(req, res, next) {
    if (!req.usuario)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    next()
})

app.listen(app.get('port'),()=>{
    console.log(`Servidor en el puerto ${app.get('port')}`)
})