const express = require('express');
const router = express.Router();
const User =  require('../schemas/User.js');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');
const specialEvents = require('../mocks/data.mocks');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-control, Content-Type");
  res.header("Access-Control-Max-Age","1728000");
  res.header("Access-Control-Allow-Credentials","true");
  next();
});

router.post('/register', (req, res) => {
  const newUser = req.body;
  User.findOne({email: newUser.email}, (err, user) => {
    if(err) {
      throw new Error(err);
    } else {
      if(!user) {
        User(newUser).save((err, registeredUser) => {
          if(err) {
            throw new Error(err);
          } else {
            // generate and send JWT
            let payload = { subject: registeredUser._id };
            // second argument can be anything. Le it be a 'secretKey' string in our case
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token });
          }
        });
      } else {
        res.status(400).send('The email already exists');
      }
    }
  });
});

router.post('/login', (req, res) => {
  const userData = req.body;
  User.findOne({email: userData.email}, (err, user) => {
    if(err) {
      throw new Error(err);
    } else {
      if(!user) {
        res.status(401).send('Invalid email. It looks like the user is not registered');
      } else if(user.password !== userData.password) {
        res.status(401).send('Invalid password');
      } else {
        let payload = { subject: user._id };
        let token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });
        res.status(200).send({ token });
      }
    }
  });
});

// @todo: move specialEvents array to real collection in future
router.get('/special', verifyToken, (req, res) => {
  res.json(specialEvents)
});

module.exports = router;
