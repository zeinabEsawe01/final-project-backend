const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const User = require('../models/user')

async function doesUserExist(userObj) {
    let userData = await User.find({userName : userObj['userName']})
    if (userData.length > 0) {
        return true
    }
    return false
}


async function createUser(userObj) {
    const hashedPassword = await bcrypt.hash(userObj.password, 10)
    const user = new User({
        userName: userObj['userName'],
        email: userObj.email,
        password: hashedPassword,
        groups: [],
        favorites: []
    });
    let doesExist = await doesUserExist(user)
    if (!doesExist) {
        user.save()
        return user
    }
    return null
}

async function authenticateUser(username, password) {
    const user = await User.findOne({
      userName:username
    })
    if (!user) {
      return null
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return null
    }
    return  user 
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET)
}

async function addGroupToFavorite(userId, groupId, add) {
    let favorite = {}
    if (add === "true") {
          favorite = await User.findByIdAndUpdate(
            {_id: userId},
            {$push: {favorites:groupId}}
        )
    } else {
         favorite = await User.findByIdAndUpdate(
            {_id: userId},
            {$pull: {favorites:groupId}}
        )
    }
    
    return favorite
}

async function getUser(userId) {
    let user = await User.findById({_id: userId})
    console.log(user);
    return user

}

async function removeGroupFromUser(userId, groupId) {
    let result = await User.findByIdAndUpdate(
        {_id: userId},
        {$pull: {groups:groupId}}
    )
    return result
}

const authenticateUserToken = function (req, res, next) {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
      });
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };

module.exports = {
    createUser,
    authenticateUser,
    generateAccessToken,
    addGroupToFavorite,
    getUser,
    removeGroupFromUser,
    authenticateUserToken
}