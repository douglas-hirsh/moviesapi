const mongoose = require('mongoose')
const Schema = mongoose.Schema

const moviesSchema = new Schema({
  title: { type: String, required: true },
  rating: { type: String },
  poster: { type: String },
  year: { type: String },
  genre: { type: String },
  director: { type: String },
  plot: { type: String },
  actors: { type: String },
  createdBy: { type: String, required: true }
})

module.exports = moviesSchema
