const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET routes
 */

/**
 * POST routes
 */
router.post('/:vehicleId', rejectUnauthenticated, (req, res) => {
  const { vehicleId } = req.params;
  const { date } = req.body;

  const query = `
    INSERT INTO "rental" ("rented_by", "date_id", "vehicle_id")
      VALUES ($1, (select "id" from "availability" where "date_available" =  $2 and "vehicle_id" = $3), $3);
  `;
  pool
    .query(query, [req.user.id, date, vehicleId])
    .then((result) => {
      console.log('POST at /rental successful');
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error during POST to rental: ', error);
      res.sendStatus(500);
    });
});

module.exports = router;
