const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/:search", (req, res) => {

  const locationKeyword = req.params.search
  const startDate = req.params.startDate
  const endDate = req.params.endDate
  

  const query = `SELECT * FROM "vehicle_address";` 


  pool
    .query(query)
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
