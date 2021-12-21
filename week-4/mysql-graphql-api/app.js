require('dotenv').config();

const Hapi = require('@hapi/hapi');
const {
  ApolloServer,
  ApolloServerPluginStopHapiServer,
} = require('apollo-server-hapi');

const routes = require('./routes');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const init = async () => {
  const app = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginStopHapiServer({ hapiServer: app })],
  });

  app.route({
    method: 'GET',
    path: '/api/countries',
    handler: routes.listAllCountries,
  });

  app.route({
    method: 'GET',
    path: '/api/countries/{code}',
    handler: routes.listOneCountry,
  });

  app.route({
    method: 'GET',
    path: '/api/countries/{code}/cities',
    handler: routes.getCitiesByCountry,
  });

  app.route({
    method: 'GET',
    path: '/api/cities',
    handler: routes.listAllCities,
  });

  app.route({
    method: 'GET',
    path: '/api/cities/{id}',
    handler: routes.listOneCity,
  });

  app.route({
    method: 'GET',
    path: '/api/cities/{id}/country',
    handler: routes.getCountryByCity,
  });

  await server.start();
  await server.applyMiddleware({ app });
  await app.start();
  console.log('Server running on %s', app.info.uri);
};

init();
