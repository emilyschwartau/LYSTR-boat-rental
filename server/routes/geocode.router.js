const express = require("express");
const router = express.Router();
const opencage = require('opencage-api-client');


//geocode api
router.get(`/:street/:city/:state/:zip`, (req, res) => {
    let { street, city, state, zip } = req.params;

    if (street == undefined)
        street = ``;
    if (city == undefined)
        city = ``;
    if (state == undefined)
        state = `MN`;
    if (zip == undefined)
        zip = ``;

    const params = {
        key: process.env.REACT_APP_OPENCAGE_API_KEY,
        q: `${street} ${city} ${state} ${zip}`,
        limit: 1,
        pretty: 1,
        countrycode: 'us',
    }
    opencage
        .geocode({ ...params })
        .then((result) => {
            const coords = { lat: result.results[0].geometry.lat, lng: result.results[0].geometry.lng };
            console.log(coords);
            res.send(coords);
        })
        .catch((error) => {
            console.log(`Error with /api/geocode`, error);
            res.sendStatus(500);
        })
});


module.exports = router;