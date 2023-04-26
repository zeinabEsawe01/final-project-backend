const User = require('../models/user')
const Group = require('../models/group')

async function doesGroupExist(groupObj) {
    let groupData = await Group.find({name : groupObj['name']})
    if (groupData.length > 0) {
        return true
    }
    return false
}

async function createGroup(groupObj) {
    let newGroup = Group (groupObj)
    let doesExist = await doesGroupExist(newGroup)
    if (!doesExist) {
        newGroup.save()
        return newGroup
    }
    return null
}

async function addNewGroup(user,newGroup) {
    
    await User.findOneAndUpdate({userName : user},{ "$push": { "groups": newGroup } })
}

async function getGroups(user) {
    let groups = (await User.find({ userName: user }).select({ "_id": 0}).populate("groups").exec())[0]
    return groups
}

async function getMembers(GroupId) {
    let members = (await Group.find({ _id: GroupId }))
    return members
}


module.exports = {
    createGroup,
    doesGroupExist,
    addNewGroup,
    getGroups,
    getMembers
}
