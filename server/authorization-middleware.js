const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error'); // eslint-disable-line

function authorizationMiddleware(req, res, next) {
  /* your code here */
  const token = req.get('X-Access-Token');
  if (!token) {
    throw new ClientError(401, 'authentication required');
  }
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.send(err);
  }
}

module.exports = authorizationMiddleware;
