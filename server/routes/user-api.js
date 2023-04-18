const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const secretKey = 'my_secret_key'

function authenticateUser(username, password) {
    const user = User.find({
      userName:username
    })[0]
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
    return jwt.sign(user, secretKey)
}

router.post('/login', (req, res) => {
    const { username, password } = req.body
    const user = authenticateUser(username, password)
    if (!user) {
      return res.status(401).send({ message: 'Invalid username or password' })
    }
    const accessToken = generateAccessToken(user)
    res.send({ accessToken })
})

module.exports = router