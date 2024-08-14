const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  product: {
    type: Array,
    default: []
  },
  picture: String,
  gst: Number
})

module.exports = mongoose.model('owner', ownerSchema)