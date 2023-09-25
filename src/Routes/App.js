const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Conexiondb = require('../DBase/Mongoose/ConexionMongo')
const CreateConection = require('../DBase/Mongoose/CreateConection')
const users_schema = require('../DBase/Mongoose/Models/users_schema')
const {
  FindUserByIdOnProduct,
  FindDataByIdUser
} = require('../DBase/Mongoose/Queries/ConsumeAPI')

//MIDDLEWARES
//-- verifica si viene cabecera
function VerifyInToken (req, res, next) {
  const Bheader = req.headers['autorization']
  if (typeof Bheader !== 'undefined') {
    req.token = Bheader.split(' ')[1]
    req.id_prod = Bheader.split(' ')[2]
    req.user = Bheader.split(' ')[3]
    console.log(Bheader)
    next()
  } else {
    console.error(403)
    res.sendStatus(403)
  }
}

//RUTAS
//-- enrutamiento seguro a dashboard
router.get('/app/dashboard', VerifyInToken, (req, res) => {
  jwt.verify(req.token, 'Rouse17*', (error, data) => {
    if (error) {
      console.error(error)
      res.json({
        valor: 103,
        msj: 'Error en generación de token: ' + error
      })
    } else {
      console.log('todo dashboard', data.split(';')[0])
      res.json({
        valor: 100,
        data: data.split(';')[0]
      })
    }
  })
})

//-- consumo de API
router.get('/load/data/startapp', VerifyInToken, async (req, res) => {
  let token = req.token
  let id_prod = req.id_prod
  let user = req.user

  let LoadDataUser = await FindUserByIdOnProduct(token, user)
  if (LoadDataUser !== null) {
    let dataAPI = await FindDataByIdUser(LoadDataUser._id.toString())
    if (dataAPI !== null) {
      console.log('====================================')
      console.log('responde: ', dataAPI)
      console.log('====================================')
      res.json({
        valor: 200,
        user: LoadDataUser,
        data: dataAPI,
        msj: 'Datos de aplicación encontrados'
      })
    } else {
      console.log('====================================')
      console.log('responde: ', dataAPI)
      console.log('====================================')
      res.json({
        valor: 204,
        msj: 'No existen datos asignados al usuario'
      })
    }
  } else {
    console.log('====================================')
    console.log('responde: ', LoadDataUser)
    console.log('====================================')
    res.json({
      valor: 203,
      msj: 'Usuario o token expiraron'
    })
  }
})

module.exports = router
