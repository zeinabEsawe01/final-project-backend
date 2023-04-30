const express = require('express')
const groupUtils = require('../utils/groupUtils')
const User = require('../models/user')
const Group = require('../models/group')
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
    let groups = await groupUtils.getGroups(user)
    res.send(groups)
})



router.get('/groupMembers/:groupId', async function (req,res) {
    let groupId = req.params.groupId
    let members = await groupUtils.getMembers(groupId)
    res.send(members)
})

router.get('/groupPlaces/:groupId', async function (req,res) {
    let groupId = req.params.groupId
    let places = await groupUtils.getMembers(groupId)
    res.send(places)
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

router.put('/groups/addMember', async (req, res) => {
    const { groupId, userId } = req.body;
    try {
      // Find the group by ID
      const group = await groupUtils.getGroup(groupId);
  
      if (!group) {
        return res.status(404).send('Group not found');
      }
  
      // Find the user by ID
      const user = await User.findById(userId);
      console.log(user);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      let isExist = groupUtils.isMemmberExist(group , user.userName);
      
      // Add the user ID to the group's list of members
      if (isExist) {
        return res.status(404).send('User already exist');
      }
      await Group.findOneAndUpdate({ _id: groupId },{"$push":{"members":user.userName}})
    
    //   await group.save();
    
      res.send(group);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

module.exports = router