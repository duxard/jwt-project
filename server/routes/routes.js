const express = require('express');
const router = express.Router();
const User =  require('../schemas/User.js');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-control, Content-Type");
  res.header("Access-Control-Max-Age","1728000");
  res.header("Access-Control-Allow-Credentials","true");
  next();
});
// TODO: finish up
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
            res.status(200).send(registeredUser);
          }

          // let payload = { subject: registeredUser._id };
          // // second argument can be anything. Le it be
          // // a string in our case
          // let token = jwt.sign(payload, 'secretKey');
          // res.status(200).send({ token });
        });
      } else {
        res.status(400).send('The email already exists');
      }
    }
  });
});
// TODO: finish up
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
        res.status(200).send(user);
        // let payload = { subject: user._id };
        // // second argument can be anything. Le it be
        // // a string in our case
        // let token = jwt.sign(payload, 'secretKey');
        // res.status(200).send({ token });
      }
    }
  });
});

// TODO: move it to real collection in future
router.get('/special', (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ];
  res.json(specialEvents)
});

module.exports = router;
