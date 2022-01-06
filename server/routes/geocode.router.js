const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

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
            // console.log(`this is geocode result[0]`, result);
            const coords = { lat: result.results[0].geometry.lat, lng: result.results[0].geometry.lng };
            // console.log(`this is all response from geocode`, response.results);
            console.log(`this is coords of location`, coords);
            res.send(coords);
        })
        .catch((error) => {
            console.log(`Error with /api/geocode/${street}/${city}/${state}/${zip}`, error);
            res.sendStatus(500);
        })
})


module.exports = router;