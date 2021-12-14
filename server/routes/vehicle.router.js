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

// /**
//  * POST route template
//  */
// router.post("/", (req, res) => {
//   // POST route code here
// });

module.exports = router;
