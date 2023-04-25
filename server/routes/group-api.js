const express = require('express')
const groupUtils = require('../utils/groupUtils')
const router = express.Router()


router.post('/:user',async function (req,res) {
    let user = req.params.user
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
    let user = req.params.user
    // let groups = await groupUtils.getGroups(user)
    // res.send(groups)
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

router.get('/groupMembers/:groupId', async function (req,res) {
    let groupId = req.params.groupId
    let members = await groupUtils.getMembers(groupId)
    res.send(members)
})

router.put('/:groupId',async function (req,res) {
    let groupId = req.params.groupId
    let user = req.body
    let group = await groupUtils.updateGroup(user,groupId)

    if (group) {
        res.status(201).send(group)
    }else{
        res.status(409).send(`Error`)
    }
})

module.exports = router