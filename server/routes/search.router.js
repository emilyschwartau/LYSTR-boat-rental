const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/:location/:startDate/:vehicleType", (req, res) => {

    const locationKeyword = req.params.location
    const startDate = req.params.startDate
    const vehicleType = req.params.vehicleType

    console.log(locationKeyword, startDate, vehicleType)

    const query = `
    select *
    from vehicle
    WHERE city = $1
    and type_id = $2
    ;`

    const values = [locationKeyword,vehicleType]

    pool
        .query(query,values)
        .then((result) => res.send(result.rows))
        .catch((err) => {
            console.log(`Error making query`, err);
            res.sendStatus(500);
        });
});

router.get("/features", (req, res) => {
    const query = `SELECT * FROM "features";`;
    pool
        .query(query)
        .then((result) => res.send(result.rows))
        .catch((err) => {
            console.log(`Error making query `, err);
            res.sendStatus(500);
        });
});

// /**
//  * POST route template
//  */
// router.post("/", (req, res) => {
//   // POST route code here
// });

module.exports = router;
