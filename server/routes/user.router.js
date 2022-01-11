const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const multer = require('multer');
const upload = multer({
  dest: 'uploads/',
  onError: function (err, next) {
    console.log('upload error', err);
    next(err);
  },
});
const {
  uploadFile,
  getFileStream,
  deleteFile,
  // upload,
} = require('../services/s3.js');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// route for getting profile picture upload from S3
router.get('/pic/:key', (req, res) => {
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

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', upload.single('profilePic'), async (req, res) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  let profilePic = req.file;

  try {
    let profilePicKey;
    if (req.file) {
      profilePicKey = await uploadFile(profilePic);
      await unlinkFile(profilePic.path);
    } else {
      profilePicKey = '';
    }

    const queryText = `INSERT INTO "user" (username, password, first_name, last_name, profile_picture, email)
    VALUES ($1, $2, $3, $4, $5, $6);`;
    pool
      .query(queryText, [
        username,
        password,
        firstName,
        lastName,
        profilePicKey.Key,
        email,
      ])
      .then((result) => res.sendStatus(201))
      .catch((err) => {
        console.log('User registration failed: ', err);
        res.sendStatus(500);
      });
  } catch (error) {
    console.log('error uploading', error);
    res.sendStatus(500);
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// handles profile information update
router.put('/', rejectUnauthenticated, (req, res) => {
  const { username, first_name, last_name, email } = req.body;
  const query = `
    UPDATE "user" 
    SET "username" = $1, "first_name" = $2, "last_name" = $3, "email" = $4
    WHERE "id" = $5;
  `;
  pool
    .query(query, [username, first_name, last_name, email, req.user.id])
    .then((result) => res.sendStatus(201))
    .catch((err) => {
      console.log('User profile update failed: ', err);
      res.sendStatus(500);
    });
});

// handles profile picture update
router.put(
  '/pic',
  rejectUnauthenticated,
  upload.single('profilePic'),
  async (req, res) => {
    const newPic = req.file;
    const { oldPic } = req.body;

    // upload the new pic to S3
    const profilePicKey = await uploadFile(newPic);
    unlinkFile(newPic.path);
    // delete old picture from S3
    deleteFile(oldPic);
    console.log('deleted from s3');

    // store the new key in the database
    const query = `
    UPDATE "user"
    SET "profile_picture" = $1
    WHERE "id" = $2;
    `;
    pool
      .query(query, [profilePicKey.Key, req.user.id])
      .then((result) => res.sendStatus(201))
      .catch((err) => {
        console.log('User profile pic update failed: ', err);
        res.sendStatus(500);
      });
  }
);

module.exports = router;
