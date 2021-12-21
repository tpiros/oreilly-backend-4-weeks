const fastify = require('fastify')({ logger: true });
const dotenv = require('dotenv');
const convertToObjectId = require('./middlewares/convertToObjectId');

dotenv.config();

fastify.register(require('fastify-mongodb'), {
  forceClose: true,
  url: process.env.DB,
});
fastify.register(require('middie'));
fastify.register(require('./routes/employees'));
fastify.register(require('./routes/departments'));

fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
