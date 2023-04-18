const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ratingSchema  = new Schema({
    type : String,
    ratingValue : Number,
})

const Rating = mongoose.model("rating", ratingSchema) 

module.exports = Rating