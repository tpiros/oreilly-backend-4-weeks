import { data } from './data.js';

const listAllCountries = (request, reply) => {
  return reply.send(data);
};

const listOneCountry = (request, reply) => {
  const id = +request.params.id;
  const [country] = data.filter((d) => d.id === id);
  return reply.send({ country });
};

const listOneCountryV2 = (request, reply) => {
  const id = +request.params.id;
  const [country] = data.filter((d) => d.id === id);
  return reply.send({ country, requestedAt: Date.now() });
};

const getCitiesByCountry = (request, reply) => {
  const country = request.params.country.toLowerCase();
  const cities = data
    .filter((d) => d.country.toLowerCase() === country)
    .map((d) => ({
      city: d.city,
    }));

  return reply.send(cities);
};

export {
  listAllCountries,
  listOneCountry,
  getCitiesByCountry,
  listOneCountryV2,
};
