const Place = require('../models/place')

function createPlace(placeObj) {
    let newplace = new Place(placeObj)
    return newplace
}



module.exports = {
    createPlace,
}