const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: process.env.MYSQLPASS,
    database: 'world',
  },
});

const listAllCountries = async (request, h) => {
  try {
    const r = await knex.select().from('country');
    return r;
  } catch (error) {
    return JSON.stringify(error);
  }
};

const listOneCountry = async (request, h) => {
  const { code } = request.params;
  try {
    const [r] = await knex('country')
      .where({
        code,
      })
      .select();
    return r;
  } catch (error) {
    return JSON.stringify(error);
  }
};

const getCitiesByCountry = async (request, h) => {
  const { code } = request.params;
  try {
    const r = await knex
      .select()
      .from('country AS co')
      .innerJoin('city AS ci', function () {
        this.on('ci.CountryCode', '=', 'co.Code');
      })
      .where('co.Code', '=', code);
    return r;
  } catch (error) {
    return JSON.stringify(error);
  }
};

const getCountryByCity = async (request, h) => {
  const { id } = request.params;
  console.log('get country by city ID', id);
  try {
    const [r] = await knex
      .select()
      .from('city AS ci')
      .innerJoin('country AS co', function () {
        this.on('ci.CountryCode', '=', 'co.Code');
      })
      .where('ci.ID', '=', id);
    return r;
  } catch (error) {
    return JSON.stringify(error);
  }
};

const listAllCities = async (request, h) => {
  try {
    const r = await knex.select().from('city');
    return r;
  } catch (error) {
    return JSON.stringify(error);
  }
};

const listOneCity = async (request, h) => {
  const { id } = request.params;
  try {
    const [r] = await knex('city')
      .where({
        id,
      })
      .select();
    return r;
  } catch (error) {
    return JSON.stringify(error);
  }
};

module.exports = {
  listAllCountries,
  listOneCountry,
  getCitiesByCountry,
  listAllCities,
  listOneCity,
  getCountryByCity,
};
