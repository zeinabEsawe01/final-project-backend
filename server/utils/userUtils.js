const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const User = require('../models/user')

async function doesUserExist(userObj) {
    let userData = await User.find({userName : userObj['userName']})
    if (userData.length > 0) {
        return true
    }
    return false
}

async function createUser(userObj) {
    const hashedPassword = await bcrypt.hash(userObj.password, 10)
    const user = new User({
        userName: userObj['username'],
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

async function authenticateUser(username, password) {
    const user = await User.findOne({
      userName:username
    })
    if (!user) {
      return null
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return null
    }
    return { username: user.userName, email: user.email }
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET)
}

module.exports = {
    createUser,
    authenticateUser,
    generateAccessToken
}