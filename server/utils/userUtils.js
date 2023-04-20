const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const User = require('../models/user')

async function doesUserExist(userObj) {
    let userData = await User.find({email : userObj['email']})
    if (userData.length > 0) {
        return true
    }
    return false
}

async function createUser(userObj) {
    const hashedPassword = await bcrypt.hash(userObj.password, 10)
    const user = new User({
        userName: userObj.username,
        email: userObj.email,
        password: hashedPassword,
        groups: []
      });
    let doesExist = await doesUserExist(user)
    if (!doesExist) {
        user.save()
        return user
    }
    return null
}



module.exports = {
    createUser,
    
}