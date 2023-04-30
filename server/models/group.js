const mongoose = require('mongoose')
const Schema = mongoose.Schema


const groupSchema  = new Schema({
    name : String,
    kind : String,
    members : [String],
    places : [{type: Schema.Types.ObjectId, ref:"place"}]
})

const Group = mongoose.model("group", groupSchema) 

module.exports = Group