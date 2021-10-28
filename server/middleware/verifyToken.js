const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    console.log('No authorization header');
    return res.status(401).send('Unauthorized request');
  }

  const token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    console.log('No token');
    return res.status(401).send('Unauthorized request');
  }

  try {
    const payload = jwt.verify(token, 'secretKey');
    req.userId = payload.subject;
    next();
  } catch (err) {
    return res.status(401).send(err);
  }
}

module.exports = verifyToken;
