const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {
  uploadFile,
  getFileStream,
  deleteFile,
  // upload,
} = require('../services/s3.js');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/*
 * GET routes
 */

router.get('/:vehicleId', (req, res) => {
  const { vehicleId } = req.params;

  const query = `
    SELECT "vehicle"."id" AS "vehicleId", "user"."username" AS "ownedBy", "type"."name" AS "type", "title", "make", "model", "year", "length", "capacity", "horsepower", "street", "city", "state", "zip", "description", "cabins", "heads", "daily_rate" AS "dailyRate",
	    
	    (select JSON_AGG("date_available") as "availability" from "availability" where "vehicle"."id" = "availability"."vehicle_id" and "is_rented" = FALSE),
	    (select JSON_AGG("name") as "features" from "features" join "vehicle_features" on "features"."id" = "vehicle_features"."feature_id" where "vehicle"."id" = "vehicle_features"."vehicle_id")
    FROM "vehicle" JOIN "type" ON "vehicle"."type_id" = "type"."id" JOIN "user" ON "vehicle"."owned_by" = "user"."id"
    WHERE "vehicle"."id" = $1;
  `;
  // (select JSON_AGG("image_path") as "photos" from "photos" where "vehicle"."id" = "photos"."vehicle_id"),

  pool
    .query(query, [vehicleId])
    .then((result) => {
      console.log(`GET at /vehicle/${vehicleId} successful`);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error getting vehicle info`, err);
      res.sendStatus(500);
    });
});

router.get('/photos/:vehicleId', (req, res) => {
  const { vehicleId } = req.params;

  const query = `
    SELECT "id", "vehicle_id" AS "vehicleId", "image_path" AS "path" FROM "photos"
    WHERE "vehicle_id" = $1;
  `;

  pool
    .query(query, [vehicleId])
    .then((result) => {
      console.log(`GET at /vehicle/photos/${vehicleId} successful`);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error getting vehicle photos`, err);
      res.sendStatus(500);
    });
});

// GET ALL VEHICLES LISTED BY OWNER
router.get('/allVehiclesListed/:userId', rejectUnauthenticated, (req, res) => {
  const { userId } = req.params;
  const query = `
  SELECT "vehicle"."id" AS "vehicleId", "user"."username" AS "ownedBy", "type"."name" AS "type", "title", "make", "model", "year", "length", "capacity", "horsepower", "street", "city", "state", "zip", "description", "cabins", "heads", "daily_rate" AS "dailyRate",
    (select JSON_AGG("image_path") as "photos" from "photos" where "vehicle"."id" = "photos"."vehicle_id"),
    (select JSON_AGG("date_available") as "availability" from "availability" where "vehicle"."id" = "availability"."vehicle_id"),
    (select JSON_AGG("name") as "features" from "features" join "vehicle_features" on "features"."id" = "vehicle_features"."feature_id" where "vehicle"."id" = "vehicle_features"."vehicle_id") FROM "vehicle" 
  JOIN "type" ON "vehicle"."type_id" = "type"."id" 
  JOIN "user" ON "vehicle"."owned_by" = "user"."id"
  WHERE "user"."id" = $1;
  `;
  pool
    .query(query, [userId])
    .then((result) => {
      console.log(`GET at /vehicle/allVehiclesListed/${userId} successful`);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error getting vehicle info`, err);
      res.sendStatus(500);
    });
});

// GET ALL RESERVATIONS BY USER ID
router.get(`/allReservations/:userId`, rejectUnauthenticated, (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT "rental"."id", "availability"."date_available" AS "dateRented", "vehicle"."id" AS "vehicleId", "vehicle"."title", "vehicle"."make", "vehicle"."model", "vehicle"."year", "vehicle"."capacity", "vehicle"."length", "vehicle"."horsepower", "vehicle"."daily_rate" AS "dailyRate", "vehicle"."cabins", "vehicle"."heads", "vehicle"."street", "vehicle"."city", "vehicle"."state", "vehicle"."zip", "vehicle"."description", "type"."name" AS "vehicleType",
    (select JSON_AGG("image_path") as "photos" from "photos" where "vehicle"."id" = "photos"."vehicle_id"),
    (select JSON_AGG("name") as "features" from "features" join "vehicle_features" on "features"."id" = "vehicle_features"."feature_id" where "vehicle"."id" = "vehicle_features"."vehicle_id"),
    "user"."first_name" AS "rentedBy" FROM "user"
    JOIN "rental" ON "rental"."rented_by" = "user"."id"
    JOIN "availability" ON "availability"."id" = "rental"."date_id"
    JOIN "vehicle" ON "vehicle"."id" = "availability"."vehicle_id"
    JOIN "type" ON "type"."id" = "vehicle"."type_id"
    WHERE "rental"."rented_by" = $1
    ORDER BY "dateRented" DESC;
  `;
  console.log(`in allreservations`);
  pool
    .query(query, [userId])
    .then((result) => {
      console.log(`GET at /allReservations/${userId} successful`);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error getting user reservations info`, err);
      res.sendStatus(500);
    });
});

router.get('/uploads/:key', (req, res) => {
  console.log('getting S3');
  const { key } = req.params;
  // create a read stream for the image in the S3 bucket
  const readStream = getFileStream(key);
  // handle errors
  readStream.on('error', (error) => {
    res.sendStatus(500);
  });
  // pipe the read stream to the client
  readStream.pipe(res);
});

/*
 * POST routes
 */

// vehicle
router.post('/', rejectUnauthenticated, (req, res) => {
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
    description,
    cabins,
    heads,
    dailyRate,
  } = req.body;
  const ownedBy = req.user.id;

  const query = `
    INSERT INTO "vehicle" ("owned_by", "type_id", "title", "make", "model", "year", "capacity", "length", "horsepower", "daily_rate", "cabins", "heads", "description", "street", "city", "state", "zip")
      VALUES ($1, (select "id" from "type" where "name" = $2), $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
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
      description,
      street,
      city,
      state,
      zip,
    ])
    .then((result) => {
      console.log('POST at /vehicle successful');
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error during POST to vehicle: ', error);
      res.sendStatus(500);
    });
});

//features
router.post('/features/:vehicleId', rejectUnauthenticated, (req, res) => {
  const { features } = req.body;
  const { vehicleId } = req.params;

  let query = `
    INSERT INTO "vehicle_features" ("vehicle_id", "feature_id")
      VALUES
  `;
  let values = [vehicleId];

  // build the query string
  for (let i = 0; i < features.length; i++) {
    // start at $2 since $1 will be used for vehicleId
    query += ` ($1, (select "id" from "features" where "name" = $${i + 2}))`;
    // push the featureId into values
    values.push(features[i]);
    // add a comma or semi-colon depending on if we are at the last interation or not
    if (i === features.length - 1) {
      // if last iteration, add semicolon
      query += `;`;
    } else {
      // otherwise, add comma
      query += `,`;
    }
  }
  pool
    .query(query, values)
    .then((result) => {
      console.log('POST at /vehicle/features successful');
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error during POST to vehicle_features: ', error);
      res.sendStatus(500);
    });
});

// availability
router.post('/availability/:vehicleId', rejectUnauthenticated, (req, res) => {
  const { availability } = req.body;
  const { vehicleId } = req.params;

  let query = `
    INSERT INTO "availability" ("vehicle_id", "date_available")
      VALUES
  `;
  let values = [vehicleId];

  // build the query string
  for (let i = 0; i < availability.length; i++) {
    // start at $2 since $1 will be used for vehicleId
    query += ` ($1, $${i + 2})`;
    // push the featureId into values
    values.push(availability[i]);
    // add a comma or semi-colon depending on if we are at the last interation or not
    if (i === availability.length - 1) {
      // if last iteration, add semicolon
      query += `ON CONFLICT DO NOTHING;`;
    } else {
      // otherwise, add comma
      query += `,`;
    }
  }
  pool
    .query(query, values)
    .then((result) => {
      console.log('POST at /vehicle/availability successful');
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error during POST to availability: ', error);
      res.sendStatus(500);
    });
});

// photos
router.post(
  '/photos/:vehicleId',
  rejectUnauthenticated,
  upload.array('photos'),
  async (req, res) => {
    const photos = req.files;
    const { vehicleId } = req.params;
    console.log(`/photos/${vehicleId} req.files:`, req.files);

    let imagePaths = [];

    // loop over the photos and upload them to S3
    for (const photo of photos) {
      // capture the photo's Key sent back from S3
      const result = await uploadFile(photo);
      imagePaths.push(`/api/vehicle/uploads/${result.Key}`);
      // remove them from server
      await unlinkFile(photo.path);
    }
    let queryText = `INSERT INTO "photos" ("vehicle_id", "image_path") VALUES`;

    let values = [vehicleId];

    // build the query string
    for (let i = 0; i < imagePaths.length; i++) {
      // start at $2 since $1 will be used for vehicleId
      queryText += ` ($1, $${i + 2})`;
      // push the imagePath to values array for query
      values.push(imagePaths[i]);
      // add a comma or semi-colon depending on if we are at the last interation or not
      if (i === imagePaths.length - 1) {
        // if last iteration, add semicolon
        queryText += `;`;
      } else {
        // otherwise, add comma
        queryText += `,`;
      }
    }
    console.log('photo post query:', queryText);

    pool
      .query(queryText, values)
      .then((result) => {
        console.log('POST at /vehicle/photos successful');
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(`Error uploading/posting to "photos":`, err);
        res.sendStatus(500);
      });
  }
);

//coordinates
router.post('/coordinates/:vehicleId', rejectUnauthenticated, (req, res) => {
  const { vehicleId } = req.params;
  const { lat, lng } = req.body;

  const query = `
    INSERT INTO "coordinates" ("vehicle_id", "lat", "lng")
    VALUES ($1, $2, $3);
  `;

  const values = [vehicleId, lat, lng];

  pool
    .query(query, values)
    .then((result) => {
      console.log(`POST at /vehicle/coordinates successful`);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error during POST to /vehicle/coordinates`, error);
      res.sendStatus(500);
    });
})

/*
 * DELETE routes
 */

// vehicle
router.delete('/:vehicleId', rejectUnauthenticated, (req, res) => {
  const { vehicleId } = req.params;

  const query = `DELETE FROM "vehicle" WHERE "id" = $1 AND "owned_by" = $2;`;

  pool
    .query(query, [vehicleId, req.user.id])
    .then((result) => {
      console.log(`DELETE at /vehicle/${vehicleId} successful`);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`Error deleting from "vehicle":`, err);
      res.sendStatus(500);
    });
});

// features
router.delete('/features/:vehicleId', rejectUnauthenticated, (req, res) => {
  const { vehicleId } = req.params;

  const query = `DELETE FROM "vehicle_features" WHERE "vehicle_id" = $1;`;

  pool
    .query(query, [vehicleId])
    .then((result) => {
      console.log(`DELETE at /vehicle/features/${vehicleId} successful`);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`Error deleting from "vehicle_features":`, err);
      res.sendStatus(500);
    });
});

// availability
router.delete('/availability/:vehicleId', rejectUnauthenticated, (req, res) => {
  const { vehicleId } = req.params;
  // only delete a date if there isn't a rental booked
  const query = `
    DELETE FROM "availability" 
    WHERE NOT EXISTS (
      SELECT FROM "rental"
      WHERE "rental"."date_id" = "availability"."id"
      ) 
    AND "vehicle_id" = $1;`;

  pool
    .query(query, [vehicleId])
    .then((result) => {
      console.log(`DELETE at /vehicle/availability/${vehicleId} successful`);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`Error deleting from "availability":`, err);
      res.sendStatus(500);
    });
});

// photos
router.delete('/photos/:photoId', rejectUnauthenticated, (req, res) => {
  const { photoId } = req.params;

  const query = `DELETE FROM "photos" WHERE "id" = $1 RETURNING "image_path";`;

  pool
    .query(query, [photoId])
    .then((result) => {
      const path = result.rows[0].image_path;
      deleteFile(path.split('/')[4]);
      console.log('photo deleted from S3');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`Error deleting at /vehicle/photos/${photoId}:`, err);
      res.sendStatus(500);
    });
});

/*
 * PUT routes
 */

// availability (toggle is_rented)
router.put('/availability', rejectUnauthenticated, (req, res) => {
  const { vehicleId, date } = req.query;
  console.log(req.query);

  const query = `
    UPDATE "availability"
    SET "is_rented" = NOT "is_rented"
    WHERE "vehicle_id" = $1 AND "date_available" = $2;
  `;

  pool
    .query(query, [vehicleId, date])
    .then((result) => {
      console.log(`PUT at /vehicle/availability/${vehicleId} successful`);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`Error updating vehicle availability:`, err);
      res.sendStatus(500);
    });
});

// vehicle
router.put('/:vehicleId', rejectUnauthenticated, (req, res) => {
  const { vehicleId } = req.params;
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
    description,
    cabins,
    heads,
    dailyRate,
  } = req.body;

  let values = [
    vehicleId,
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
    description,
    street,
    city,
    state,
    zip,
  ];

  let query = `
    UPDATE "vehicle" SET ("type_id", "title", "make", "model", "year", "capacity", "length", "horsepower", "daily_rate", "cabins", "heads", "description", "street", "city", "state", "zip") = 
      ((select "id" from "type" where "name" = $2), $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      WHERE "id" = $1;
  `;

  pool
    .query(query, values)
    .then((result) => {
      console.log(`PUT at /vehicle/${vehicleId} successful`);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`Error updating vehicle:`, err);
      res.sendStatus(500);
    });
});

//coordinates update
//coordinates
router.put('/coordinates/:vehicleId', rejectUnauthenticated, (req, res) => {
  const { vehicleId } = req.params;
  const { lat, lng } = req.body;

  const query = `
    UPDATE "coordinates"
    SET "lat" = $2, "lng" = $3
    WHERE "vehicle_id" = $1;
  `;

  const values = [vehicleId, lat, lng];

  pool
    .query(query, values)
    .then((result) => {
      console.log(`PUT at /vehicle/coordinates successful`);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error during PUT to /vehicle/coordinates`, error);
      res.sendStatus(500);
    });
})

module.exports = router;
