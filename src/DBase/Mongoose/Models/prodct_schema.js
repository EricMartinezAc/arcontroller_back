const mongoose = require('mongoose')

let prodct_schema = new mongoose.Schema({
  clav_prodct: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('data_prodct', prodct_schema)
