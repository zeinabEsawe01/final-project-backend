const mongoose = require('mongoose')
const Schema = mongoose.Schema


const placeSchema  = new Schema({
    img : String,
    title : String,
    description : String,
    placeRatings : [{type: Schema.Types.ObjectId, ref:"rating"}]
})

const Place = mongoose.model("place", placeSchema) 
module.exports = Place