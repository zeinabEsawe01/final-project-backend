const express = require('express')
const router = express.Router()
const userUtils = require('../utils/userUtils')
// router.use(userUtils.authenticateUserToken)
const User = require('../models/user')

router.post('/login',async (req, res) => {
    const { username, password } = req.body
    const user = await userUtils.authenticateUser(username, password)
    if (!user) {
      return res.status(401).send({ message: 'Invalid username or password' })
    }
    const accessToken = userUtils.generateAccessToken({...user})
    res.status(201).send({ accessToken, user })
})

router.post('/signup',async function (req,res) {
  let user = await userUtils.createUser(req.body)
  console.log(user);
  if (user) {
    const accessToken = userUtils.generateAccessToken({...user})
    res.status(201).send({ accessToken, user })
  }else{
    res.status(409).send(`user is alraedy exist`)
  }
})

router.put('/:userId', async function (req,res) {
  let userId = req.params.userId
  let {groupId, add} = req?.query 
  let result = {}
  if (add !== undefined) {
    result = await userUtils.addGroupToFavorite(userId, groupId, add)
  } else {
    result = await userUtils.removeGroupFromUser(userId, groupId)
  }
  if (result) {
      res.status(201).send(result)
  }else{
      res.status(409).send(`Error`)
  }
})

router.get('/users/:userId' ,async function(req, res){
  let userId = req.params.userId
  let user = await userUtils.getUser(userId)
  res.status(200).send(user)
})

router.get('/returnUsers', async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find();

    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// , userUtils.authenticateUserToken
module.exports = router