const express = require("express");
const router = express.Router();
const opencage = require('opencage-api-client');


//geocode using only city
router.get(`/:city`, (req, res) => {
    const { city } = req.params;

    const params = {
        key: process.env.REACT_APP_OPENCAGE_API_KEY,
        q: `${city}, MN`,
        limit: 1,
        pretty: 1,
        countrycode: 'us',
    }
    opencage
        .geocode({ ...params })
        .then((result) => {
            const coords = { lat: result.results[0].geometry.lat, lng: result.results[0].geometry.lng };
            console.log(`this is coords of city`, coords);
            res.send(coords);
        })
        .catch((error) => {
            console.log(`Error with /api/geocode/${city}`, error);
            res.sendStatus(500);
        })
});

//geocode using vehicle address
router.get(`/:street/:city/:state/:zip`, (req, res) => {
    const { street, city, state, zip } = req.params;

    const params = {
        key: process.env.REACT_APP_OPENCAGE_API_KEY,
        q: `${street}, ${city}, ${state} ${zip}`,
        limit: 1,
        pretty: 1,
        countrycode: 'us',
    }
    opencage
        .geocode({ ...params })
        .then((result) => {
            const coords = { lat: result.results[0].geometry.lat, lng: result.results[0].geometry.lng };
            console.log(`this is coords of location`, coords);
            res.send(coords);
        })
        .catch((error) => {
            console.log(`Error with /api/geocode/${street}/${city}/${state}/${zip}`, error);
            res.sendStatus(500);
        })
});


module.exports = router;