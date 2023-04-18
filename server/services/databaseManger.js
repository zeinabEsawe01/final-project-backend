const mongoose = require('mongoose')

    function connect(){
        
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
          }).catch((err)=> console.log(err))        
    }
  

module.exports = { connect }