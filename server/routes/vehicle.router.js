const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  uploadFile,
  getFileStream,
  deleteFile,
  // upload,
} = require("../services/s3.js");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

/**
 * GET route template
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

router.post("/", (req, res) => {
  console.log(req.body);
  const {
    title,
    type,
    make,
    model,
    year,
    length,
    capacity,
    horsepower,
    street,
    city,
    state,
    zip,
    instructions,
    cabins,
    heads,
    dailyRate,
  } = req.body;
  const ownedBy = req.user.id;

  const query = `
    INSERT INTO "vehicle" ("owned_by", "type_id", "title", "make", "model", "year", "capacity", "length", "horsepower", "daily_rate", "cabins", "heads", "instructions", "street", "city", "state", "zip")
      VALUES ($1, (SELECT "id" FROM "type" WHERE "name = $2), $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING "id";
  `;

  pool
    .query(query, [
      ownedBy,
      type,
      title,
      make,
      model,
      year,
      capacity,
      length,
      horsepower,
      dailyRate,
      cabins,
      heads,
      instructions,
      street,
      city,
      state,
      zip,
    ])
    .then((result) => {
      console.log("POST to /vehicle successful");
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error during POST to vehicle: ", error);
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
