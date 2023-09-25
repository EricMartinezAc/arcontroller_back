const users_schema = require('../Models/users_schema')
const prodct_schema = require('../Models/prodct_schema')

const FindByUSUandPsw = async (user, pswLogin, clav_prodct) => {
  if (clav_prodct === 'PM') {
    console.log('buscar como PM')
    return await users_schema.findOne({ user, pswLogin }).exec()
  } else {
    console.log('buscar como PO')
    let findProdct = await prodct_schema.findOne({ clav_prodct }).exec()
    if (findProdct !== null) {
      return await users_schema.findOne({ user, pswLogin, rol: 'PO' }).exec()
    } else {
      console.log('clave erronea')
      return await 'bad'
    }
  }
}
const RegtrByUSUandPsw = async (user, pswLogin, rol) => {
  return await new users_schema({ user, pswLogin, rol }).save()
}

const FindAndUpdateToken = (id, _token) => {
  return users_schema.findByIdAndUpdate({ _id: id }, { token: _token })
}

module.exports = { FindByUSUandPsw, RegtrByUSUandPsw, FindAndUpdateToken }
