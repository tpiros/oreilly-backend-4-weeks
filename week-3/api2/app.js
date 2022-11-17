import Fastify from 'fastify';
import {
  listAllCountries,
  listOneCountry,
  getCitiesByCountry,
  listOneCountryV2,
} from './routes.js';
const fastify = Fastify();

const serverOptions = {
  port: 3000,
};

fastify.get('/api/countries', listAllCountries);
// fastify.get('/api/:country/cities', getCitiesByCountry);

fastify.route({
  method: 'GET',
  url: '/api/:country/cities',
  schema: {
    querystring: {
      name: { type: 'string' },
      howManyToReturn: { type: 'integer' },
    },
  },
  handler: getCitiesByCountry,
});

fastify.route({
  method: 'GET',
  url: '/api/countries/:id',
  constraints: {
    version: '1.1.0',
  },
  handler: listOneCountry,
});

fastify.route({
  method: 'GET',
  url: '/api/countries/:id',
  constraints: {
    version: '2.0.0',
  },
  handler: listOneCountryV2,
});

fastify.listen(serverOptions, () => {
  console.log('Listening on port 3000');
});
