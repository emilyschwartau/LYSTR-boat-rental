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

module.exports = router;
