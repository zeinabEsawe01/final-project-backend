const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const userUtils = require('../utils/userUtils')

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

router.post('/',async function (req,res) {
  let newUser = await userUtils.createUser(req.body)
  if (newUser) {
    res.status(201).send(`the user ${newUser.userName} is created`)
  }else{
    res.status(409).send(`user is alraedy exist`)
  }
})


router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      groups: req.body.groups
    });
    user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
    res.json({ token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Server error" })
  }
})





module.exports = router