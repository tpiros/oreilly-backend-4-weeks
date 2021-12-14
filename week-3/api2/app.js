import Fastify from 'fastify';
const fastify = Fastify();
import {
  listAllCountries,
  listOneCountry,
  listOneCountryV2,
  getCityInfo,
} from './routes.js';

fastify.head('/api/countries', listAllCountries);
fastify.get('/api/countries', listAllCountries);
fastify.get('/api/countries/:id', {
  constraints: {
    version: '1.1.0',
  },
  handler: listOneCountry,
});

fastify.get('/api/countries/:id', {
  constraints: {
    version: '2.0.0',
  },
  handler: listOneCountryV2,
});

fastify.get('/api/cities/:country', getCityInfo);

fastify.listen(3000, () => console.log(`Listening on port 3000`));
