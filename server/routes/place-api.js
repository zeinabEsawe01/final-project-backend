const express = require('express')
const placeUtils = require('../utils/placeUtils')
const axios = require('axios')
const router = express.Router()


function getCustomUrl(placesInfo) {
    return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${placesInfo.lat},${placesInfo.lng}&radius=5000&types=${placesInfo.type}&key=${process.env.PLACES_API_KEY}`
}



async function getPlaces(placesInfo) {
    const config = {
        method: 'get',
        url: getCustomUrl(placesInfo),
        headers: { }
    };
    let res = await axios(config)
    return res.data
}

router.get('/',async function (req,res) {
    let places =  (await getPlaces(req.body)).results
    res.send(places)
})



module.exports = router