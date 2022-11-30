const jwt = require('jsonwebtoken');

function authenticate(request, reply, next) {
  // Authorization: Bearer _token_
  const { authorization } = request.headers;
  if (authorization) {
    const [, token] = authorization.split(' ');
    jwt.verify(token, 's3cr3t', (error, decodedToken) => {
      if (error) {
        return reply.code(401).send('Authentication error');
      } else {
        request.decodedToken = decodedToken;
        request.isAuthenticated = true;
        next();
      }
    });
  } else {
    return reply.code(403).send('No token provided');
  }
}

module.exports = {
  authenticate,
};
