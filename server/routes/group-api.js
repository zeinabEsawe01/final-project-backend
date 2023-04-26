const express = require('express')
const groupUtils = require('../utils/groupUtils')
const router = express.Router()


router.post('/:user',async function (req,res) {
    let user = 'yahya ameen'
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
    let user = 'yahya ameen'
    let groups = await groupUtils.getGroups(user)
    res.send(groups)
})

router.get('/members/:GroupId', async function (req,res) {
    let GroupId = req.params.GroupId
    let members = await groupUtils.getMembers(GroupId)
    res.send(members)
})



module.exports = router