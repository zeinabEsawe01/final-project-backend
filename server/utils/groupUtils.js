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
    const placeVoting = {placeId : place._id, likes: 0, usersVotingNames : []}
    let group = await Group.findByIdAndUpdate({ _id: `${groupId}` },{"$push":{"places":place}})
    let group1 = await Group.findByIdAndUpdate({ _id: `${groupId}` },{"$push":{"voting":placeVoting}})
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
    let places = (await Group.findById({ _id: groupId }).select({ "_id": 0}).populate("places").exec()).places
    console.log(places);
    return places
}

async function updateGroup(user, groupId ) {
    let group = await Group.findOneAndUpdate({ _id: groupId },{"$push":{"members":user}})
    return group
}

async function updateGroupVoting(userName,groupData, add ) {
    let group = {}
    if (add === "true"){
        group = await Group.findOneAndUpdate(
            { _id: groupData._id, 'voting.placeId': groupData.voting.placeId },
            { $set: { 'voting.$.likes': groupData.voting.likes},$push: { 'voting.$.userVotingNames': userName } },
            { new: true }
        )
    } else {
        group = await Group.findOneAndUpdate(
            { 'voting.placeId': groupData.voting.placeId },
            { $set: { 'voting.$.likes': groupData.voting.likes},$pull: { 'voting.$.userVotingNames': userName } },
            { new: true }
        )
}
    
    return group
}

async function deleteGroup(groupId ) {
    let result = await Group.deleteOne({ _id: groupId });
    return result
}

async function updateGroupMembers(userName, groupId) {
    let result = await Group.findByIdAndUpdate(
        {_id: groupId},
        {$pull: {members:userName}}
    )
    return result
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
    isMemmberExist,
    deleteGroup,
    updateGroupMembers
}
