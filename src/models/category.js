const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  cat: {
    type: [],
    required: true
  },
  language: {
    type: String,
    required: true
  },
}, { timestamps: true, toJSON: { virtuals: true } })

mongoose.pluralize(null)
const model = mongoose.model('Category', categorySchema)

module.exports = model
