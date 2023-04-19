
const User = require('../models/user')

async function doesUserExist(userObj) {
    let userData = await User.find({userName : userObj['userName']})
    if (userData.length > 0) {
        return true
    }
    return false
}

async function createUser(userObj) {
    let newUser = User (userObj)
    let doesExist = await doesUserExist(newUser)
    if (!doesExist) {
        newUser.save()
        return newUser
    }
    return null
}



module.exports = {
    createUser,
    
}