const express = require('express')
const router = express.Router()
const userUtils = require('../utils/userUtils')

router.post('/login',async (req, res) => {
    const { username, password } = req.body
    const user = await userUtils.authenticateUser(username, password)
    if (!user) {
      return res.status(401).send({ message: 'Invalid username or password' })
    }
    const accessToken = userUtils.generateAccessToken({...user})
    res.status(201).send({ accessToken })
})

router.post('/signup',async function (req,res) {
  let newUser = await userUtils.createUser(req.body)
  if (newUser) {
    const accessToken = generateAccessToken({...newUser})
    res.status(201).send({ accessToken })
  }else{
    res.status(409).send(`user is alraedy exist`)
  }
})

module.exports = router