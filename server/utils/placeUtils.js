const Place = require('../models/place')
const PHOTOS_API = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=Aap_uEA7vb0DDYVJWEaX3O-AtYp77AaswQKSGtDaimt3gt7QCNpdjp1BkdM6acJ96xTec3tsV_ZJNL_JP-lqsVxydG3nh739RE_hepOOL05tfJh2_ranjMadb3VoBYFvF0ma6S24qZ6QJUuV6sSRrhCskSBP5C1myCzsebztMfGvm7ij3gZT&key=YOUR_API_KEY`




function createPlace(placeObj) {
    let newPlace = new Place({
        img: placeObj.img,
        title: placeObj.title,
        description: placeObj.description,
        placeRatings: []
    })
    newPlace.save()
    return newPlace
}

function getCustomPhotoUrl(photo_reference) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${process.env.PLACES_API_KEY}`
}

function getCustomUrl(placesInfo) {
    return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${placesInfo.lat},${placesInfo.lng}&radius=5000&types=${placesInfo.type}&key=${process.env.PLACES_API_KEY}`
}


function placeFormat(placesData) {
    let places = []
    for (const place of placesData) {
        let p = {
            img : place.photos ? getCustomPhotoUrl(place.photos[0].photo_reference) : null,
            title : place.name,
            description : place.vicinity
        }
        places.push(p)
    }
    return places
}



module.exports = {
    createPlace,
    placeFormat,
    getCustomUrl
}