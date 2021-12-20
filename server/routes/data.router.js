const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/*
 * GET routes
 */


router.get("/cities", (req, res) => {
  const query = `
  SELECT city_name, county_name, zip
  FROM "cities"
  WHERE city_name LIKE 'A%'
  ;`;
  pool
    .query(query)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

router.get("/types", (req, res) => {
  const query = `SELECT * FROM "type";`;
  pool
    .query(query)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

router.get("/features", (req, res) => {
  const query = `SELECT * FROM "features";`;
  pool
    .query(query)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

router.get("/vehicleOwner/:vehicleId", (req, res) => {
  const {vehicleId} = req.params;
  const query = `
    SELECT "first_name" AS "firstName", "last_name" AS "lastName" FROM "user"
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

router.get("/vehicleOwner/:id", (req, res) => {
  const query = `SELECT * FROM "features";`;
  pool
    .query(query)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

/**
 * POST routes
 */

module.exports = router;
