const jwt = require('jsonwebtoken');

function authenticate(request, reply, next) {
  const { authorization } = request.headers;
  if (authorization) {
    // Authorization: Bearer token
    const token = authorization.split(' ')[1];
    jwt.verify(token, 's3cr3t', (error, decodedToken) => {
      // reminder, do not store the secret here!
      if (error) {
        return reply.code(401).send('Authentication error');
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    return reply.code(405).send('No token provided');
  }
}

module.exports = {
  authenticate,
};
