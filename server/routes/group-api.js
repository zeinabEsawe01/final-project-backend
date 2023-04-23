const express = require('express')
const groupUtils = require('../utils/groupUtils')
const router = express.Router()


router.post('/',async function (req,res) {
    let user = 'bahjat9' // the logged in user
    console.log(req.body);
    let newGroup = await groupUtils.createGroup(req.body)
    if (newGroup) {
        groupUtils.addNewGroup(user,newGroup)
        res.status(201).send(`the group ${newGroup.name} is created`)
    }else{
        res.status(409).send(`group is alraedy exist`)
    }
})

router.get('/:user', async function (req,res) {
    let user = 'bahjat9' // the logged in user
    let groups = await groupUtils.getGroups(user)
    res.send(groups)
})

router.put('/favorite/:userId',async function (req,res) {
    let userId = req.params.userId
    let {groupId} = req?.query 
    let favorite = await groupUtils.addGroupToFavorite(userId, groupId)

    if (favorite) {
        res.status(201).send(favorite)
    }else{
        res.status(409).send(`Error`)
    }
})

module.exports = router