'use strict';

const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: process.env.JWKS_URI
});

// https://www.npmjs.com/package/jsonwebtoken (search for auth0)
function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// we need to verfy that the user on our route is who they say
function verifyUser(req, errorFirstOrUserCallbackFunction) {
  try {
    // extract the token from the user's request
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    // from jsonwebtoken docs
    jwt.verify(token, getKey, {}, errorFirstOrUserCallbackFunction)
  } catch(error) {
    errorFirstOrUserCallbackFunction('not authorized');
  }
}

module.exports = verifyUser;
