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
async function getGroup(groupId) {
    let group = await Group.findById({_id:groupId})
    return group
}

function isMemmberExist(group , userName) {
    if(group.members.includes(userName)) {
        return true
    }
    return false
}

async function addNewGroup(user,newGroup) {
    
    await User.findOneAndUpdate({userName : user},{ "$push": { "groups": newGroup } })
}

async function updateGroupPlaces(groupId,place) {
    let group = await Group.findByIdAndUpdate({ _id: `${groupId}` },{"$push":{"places":place}})
    return group
}

async function getGroups(user) {
    let groups = (await User.find({ userName: user }).select({ "_id": 0}).populate("groups").exec())[0].groups
    return groups
}

async function getMembers(groupId) {
    let members = (await Group.findById({ _id: groupId }).select({ "_id": 0}).populate("members").exec())[0].members
    return members
}

async function getPlaces(groupId) {
    let places = (await Group.findById({ _id: groupId }).select({ "_id": 0}).populate("places").exec())[0].places
    return places
}

async function updateGroup(user, groupId ) {
    let group = await Group.findOneAndUpdate({ _id: groupId },{"$push":{"members":user}})
    return group
}

async function updateGroupVoting(userId,groupData, add ) {
    let group = {}
    if (add === "true"){
        group = await Group.findOneAndUpdate(
            { 'voting.placeId': groupData.voting.placeId },
            { $set: { 'voting.$.likes': groupData.voting.likes},$push: { 'voting.$.userVotingId': userId } },
            { new: true }
        )
    } else {
        group = await Group.findOneAndUpdate(
            { 'voting.placeId': groupData.voting.placeId },
            { $set: { 'voting.$.likes': groupData.voting.likes},$pull: { 'voting.$.userVotingId': userId } },
            { new: true }
        )
}
    
    return group
}


module.exports = {
    createGroup,
    doesGroupExist,
    getGroup,
    addNewGroup,
    getGroups,
    getMembers,
    updateGroup,
    updateGroupPlaces,
    getPlaces,
    updateGroupVoting,
    isMemmberExist
}
