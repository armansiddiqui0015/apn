const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  image: Buffer,
  discount: {
    type: String,
    default: 0
  },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,

})

module.exports = mongoose.model('product', productSchema)