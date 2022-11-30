require('dotenv').config();
const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
};
const fastify = require('fastify')({
  logger: envToLogger[process.env.environment] ?? true,
});
fastify.register(require('@fastify/mongodb'), {
  forceClose: true,
  url: process.env.DB,
});

fastify.register(require('./routes/employees'), { prefix: '/api' });
fastify.register(require('./routes/departments'), { prefix: '/api' });

const serverOptions = {
  port: 3000,
};
fastify.listen(serverOptions, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
