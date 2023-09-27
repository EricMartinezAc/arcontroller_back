const express = require('express')
const cors_ = require('cors')
const bodyParser = require('body-parser')
const RouterUsers = require('./src/Routes/Users')
const RouterApp = require('./src/Routes/App')

//require('./src/DBase/Firebase/ConexionFirebase')
const diccionario = require('./diccionario')()

const App = express()

// middlewares
App.use(
  express.json({
    limit: '35mb'
  })
)
App.use(
  cors_({
    origin: diccionario.routes.frontendApp || diccionario.routes.frontendLocal
  })
)

App.use('/home', (req, res) => {
  console.log('====================================')
  console.log('hola')
  console.log('====================================')
  res.send('Cpanel aqui')
})

App.use('/api/arcontroller/', RouterUsers)
App.use('/api/arcontroller/', RouterApp)

App.set('port', process.env.PORT || diccionario.port.prueba)

App.listen(App.get('port'), () => {
  console.log(`servidor levantado en puerto ${App.get('port')}`)
})
