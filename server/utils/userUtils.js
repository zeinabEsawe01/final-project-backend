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
    console.log(userObj);
    const hashedPassword = await bcrypt.hash(userObj.password, 10)
    console.log(userObj);
    const user = new User({
        userName: userObj['userName'],
        email: userObj.email,
        password: hashedPassword,
        groups: [],
        favorites: []
    });
    let doesExist = await doesUserExist(user)
    console.log(doesExist);
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
    return { user }
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET)
}


module.exports = {
    createUser,
    authenticateUser,
    generateAccessToken
}