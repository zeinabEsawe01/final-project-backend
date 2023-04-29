const Place = require('../models/place')

function createPlace(placeObj) {
    let newplace = new Place(placeObj)
    return newplace
}

function placeFormat(placesData) {
    let places = []
    for (const place of placesData) {
        let p = {
            photos : place.photos,
            title : place.name,
            description : place.vicinity
        }
        places.push(p)
    }
    return places
}



module.exports = {
    createPlace,
    placeFormat
}