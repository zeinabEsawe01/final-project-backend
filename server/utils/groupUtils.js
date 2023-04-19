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




module.exports = {
    createGroup,
    doesGroupExist
}
