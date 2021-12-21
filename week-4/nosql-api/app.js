require('dotenv').config();
const fastify = require('fastify')({
  logger: {
    prettyPrint:
      process.env.environment === 'development'
        ? {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          }
        : false,
  },
});
fastify.register(require('fastify-mongodb'), {
  forceClose: true,
  url: process.env.DB,
});

fastify.register(require('middie'));
fastify.register(require('./routes/employees'), { prefix: '/api' });
fastify.register(require('./routes/departments'), { prefix: '/api' });

fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
