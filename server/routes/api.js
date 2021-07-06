const express = require('express');
const router = express.Router();

router.use('/api/jwt/v1', require('./routes'));
router.use('', require('./test-routes'));

module.exports = router;
