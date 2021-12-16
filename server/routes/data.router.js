const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/*
 * GET routes
 */
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

/**
 * POST routes
 */

module.exports = router;
