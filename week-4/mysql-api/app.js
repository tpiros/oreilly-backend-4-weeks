const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  server.route({
    method: 'GET',
    path: '/api/countries',
    handler: routes.listAllCountries,
  });

  server.route({
    method: 'GET',
    path: '/api/countries/{code}',
    handler: routes.listOneCountry,
  });

  server.route({
    method: 'GET',
    path: '/api/countries/{code}/cities',
    handler: routes.getCitiesByCountry,
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
