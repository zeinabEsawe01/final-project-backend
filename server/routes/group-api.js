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



module.exports = router