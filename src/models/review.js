const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  reviews: {
    type: [],
    required: true
  }
}, { timestamps: true })

mongoose.pluralize(null)
const model = mongoose.model('Review', reviewSchema)

module.exports = model
