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
    res.status(201).send({ accessToken, user })
})

router.post('/signup',async function (req,res) {
  let user = await userUtils.createUser(req.body)
  if (user) {
    const accessToken = userUtils.generateAccessToken({...user})
    res.status(201).send({ accessToken, user })
  }else{
    res.status(409).send(`user is alraedy exist`)
  }
})

router.put('/:userId',async function (req,res) {
  let userId = req.params.userId
  let {groupId, add} = req?.query 
  let favorite = await userUtils.addGroupToFavorite(userId, groupId, add)

  if (favorite) {
      res.status(201).send(favorite)
  }else{
      res.status(409).send(`Error`)
  }
})

module.exports = router