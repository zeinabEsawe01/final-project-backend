const express = require('express')
const groupUtils = require('../utils/groupUtils')
const router = express.Router()


router.post('/',async function (req,res) {
    let newGroup = await groupUtils.createGroup(req.body)
    if (newGroup) {
        res.status(201).send(`the group ${newGroup.name} is created`)
    }else{
        res.status(409).send(`group is alraedy exist`)
    }
})



module.exports = router