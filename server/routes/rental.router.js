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
    SELECT "rental"."vehicle_id" AS "vehicleId", "make", "model", "year", "street", "city", "state", "zip", "daily_rate" AS "dailyRate", "first_name" AS "ownerFirst", "last_name" AS "ownerLast", "email", "date_available" AS "date" FROM "rental"
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

router.get('/vehicle/:vehicleId', rejectUnauthenticated, (req, res) => {
  const { vehicleId } = req.params;
  console.log(req.params);

  const query = `
    SELECT "rental"."id", "rental"."vehicle_id" AS "vehicleId", "date_available" AS "rentalDate", "first_name" AS "renterFirst", "last_name" AS "renterLast", "email" AS "renterEmail" FROM "rental"
    JOIN "availability" ON "rental"."date_id" = "availability"."id"
    JOIN "user" ON "rental"."rented_by" = "user"."id"
    WHERE "rental"."vehicle_id" = $1
    ORDER BY "date_available" ASC;
  `;

  pool
    .query(query, [vehicleId])
    .then((result) => {
      console.log(`GET at /rental/vehicle/${vehicleId} success`);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`error during GET at /rental/vehicle/${vehicleId}: `, error);
      res.sendStatus(500);
    });
});

// get the owner info for each reservation a user has
router.get('/vehicleOwner/:vehicleId', (req, res) => {
  const { vehicleId } = req.params;
  const query = `
    SELECT "first_name" AS "firstName", "last_name" AS "lastName", "email", "profile_picture" AS "profilePic" FROM "user"
    JOIN "vehicle" ON "vehicle"."owned_by" = "user"."id"
    WHERE "vehicle"."id" = $1;`;

  pool
    .query(query, [vehicleId])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`Error getting vehicle owner by vehicle id`, err);
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

// handles rental Cancellation
router.delete('/:rentalId', rejectUnauthenticated, async (req, res) => {
  const { rentalId } = req.params;

  const deleteQuery = `
    DELETE FROM "rental"
    WHERE "id" = $1
    RETURNING "date_id";
  `;

  const putQuery = `
    UPDATE "availability"
    SET "is_rented" = FALSE
    WHERE "id" = (select "date_id" from "rental" where "rental"."id" = $1);
  `;
  try {
    await pool.query(putQuery, [rentalId]);
    await pool.query(deleteQuery, [rentalId]);
    res.sendStatus(200);
  } catch (error) {
    console.log('error cancelling rental', error);
    res.sendStatus(500);
  }
  pool.query;
});

module.exports = router;
