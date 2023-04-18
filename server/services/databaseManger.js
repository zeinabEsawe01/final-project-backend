const mongoose = require('mongoose')

    function connect(){
        
        mongoose.connect("mongodb+srv://zeinabesawe:GMWUgFGxAPgQW7OZ@cluster0.1a30kmx.mongodb.net/test", {
            useNewUrlParser: true,
          }).catch((err)=> console.log(err))        
    }
  

module.exports = { connect }