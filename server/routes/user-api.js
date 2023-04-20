const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const userUtils = require('../utils/userUtils')



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
  console.log(user);
    return jwt.sign(user, process.env.JWT_SECRET)
}

router.post('/login',async (req, res) => {
    const { userName, password } = req.body
    const user = await authenticateUser(userName, password)
    if (!user) {
      return res.status(401).send({ message: 'Invalid username or password' })
    }
    const accessToken = generateAccessToken({...user})
    res.status(201).send({ accessToken })
})

router.post('/signup',async function (req,res) {
  console.log(req.body);
  let newUser = await userUtils.createUser(req.body)
  if (newUser) {
    const accessToken = generateAccessToken({...newUser})
    res.status(201).send({ accessToken })
  }else{
    res.status(409).send(`user is alraedy exist`)
  }
})


module.exports = router