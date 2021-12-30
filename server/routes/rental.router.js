const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET routes
 */
router.get('/:rentalId', rejectUnauthenticated, (req, res) => {
  const { rentalId } = req.params;

  const query = `
    SELECT "rental"."vehicle_id" AS "vehicleId", "make", "model", "year", "street", "city", "state", "zip", "first_name" AS "ownerFirst", "last_name" AS "ownerLast", "email", "date_available" AS "date" FROM "rental"
      JOIN "vehicle" ON "rental"."vehicle_id" = "vehicle"."id" 
      JOIN "availability" ON "rental"."date_id" = "availability"."id" 
      JOIN "user" ON "vehicle"."owned_by" = "user"."id"
      WHERE "rental"."id" = $1; 
  `;

  pool
    .query(query, [rentalId])
    .then((result) => {
      console.log(`GET at /rental/${rentalId} success`);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`error during GET at /rental/${rentalId}: `, error);
      res.sendStatus(500);
    });
});

/**
 * POST routes
 */
router.post('/:vehicleId', rejectUnauthenticated, (req, res) => {
  const { vehicleId } = req.params;
  const { date } = req.body;

  const query = `
    INSERT INTO "rental" ("rented_by", "date_id", "vehicle_id")
      VALUES ($1, (select "id" from "availability" where "date_available" =  $2 and "vehicle_id" = $3), $3)
      RETURNING "id";
  `;
  pool
    .query(query, [req.user.id, date, vehicleId])
    .then((result) => {
      console.log('POST at /rental successful');
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error during POST to rental: ', error);
      res.sendStatus(500);
    });
});

module.exports = router;
