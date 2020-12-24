const jwt = require('jsonwebtoken');

function jwtCreate(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '3 days',
  });
  return token;
}

module.exports = jwtCreate;
