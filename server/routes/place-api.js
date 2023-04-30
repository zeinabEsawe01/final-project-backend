const express = require('express')
const placeUtils = require('../utils/placeUtils')
const groupUtils = require('../utils/groupUtils')
const axios = require('axios')
const router = express.Router()






async function getPlaces(placesInfo) {
    const config = {
        method: 'get',
        url: placeUtils.getCustomUrl(placesInfo),
        headers: { }
    };
    let res = await axios(config)
    return res.data
}

router.get('/:lat/:lng/:type',async function (req,res) {
    let placeInfo = {
        lat : req.params.lat,
        lng : req.params.lng,
        type : req.params.type
    }
    console.log(placeInfo);
    let placesData =  (await getPlaces(placeInfo)).results
    const places = placeUtils.placeFormat(placesData)
    res.send(places)
})

router.post('/',async function (req,res) {
    const place = placeUtils.createPlace(req.body.placeInfo.place)
    const group = await groupUtils.updateGroupPlaces(req.body.placeInfo.group , place)
    res.send(group)
})



module.exports = router