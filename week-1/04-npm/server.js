const http = require('http');

const winston = require('winston');

const myTimestamp = () => new Date().toLocaleString();

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      timestamp: myTimestamp,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: 'sample.log',
      timestamp: myTimestamp,
    }),
  ],
});

const server = http.createServer((request, response) => {
  request.on('error', (error) => {
    logger.error(error);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    logger.error(err);
  });

  if (request.url === '/favicon.ico') {
    return;
  }

  if (request.method === 'GET' && request.url === '/') {
    logger.info('Successful GET method for "/"');
    response.statusCode = 200;
    response.end('Hello from Node.js');
  } else {
    logger.warn('404 error');
    response.statusCode = 404;
    response.end();
  }
});

server.listen(3000, () => logger.info('Server is up on port 3000'));
