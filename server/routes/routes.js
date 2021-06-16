const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-control, Content-Type");
  res.header("Access-Control-Max-Age","1728000");
  res.header("Access-Control-Allow-Credentials","true");
  next();
});

router.get('/', (req, res, next) => {
  res.send("Home page...");
});

router.get('/api', (req, res) => {
  res.json({
    message: 'API root...'
  });
});

module.exports = router;
