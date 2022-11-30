require('dotenv').config();

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'world',
  },
});
const listAllCountries = async (request, h) => {
  const columns = [
    'Name',
    'Continent',
    'Region',
    'HeadOfState',
    'Capital',
    'Code',
  ];

  if (request.query && request.query.orderBy) {
    const { orderBy } = request.query;
    const regex = /(.*)(:)(ASC|DESC)/gi;
    // Capital:ASC
    if (regex.test(orderBy)) {
      const [column, order] = orderBy.split(':');
      if (columns.includes(column)) {
        const res = await knex
          .select(columns)
          .from('country')
          .orderBy(column, order);
        return res;
      }
    } else {
      return JSON.stringify(
        `If using a filter please use [field]:ASC|DESC. Pick from these fields: ${columns}.`
      );
    }
  } else {
    try {
      const res = await knex.select(columns).from('country');
      return res;
    } catch (error) {
      return JSON.stringify(error);
    }
  }
};

const listOneCountry = async (request, h) => {
  const { code } = request.params;
  try {
    const [res] = await knex('country')
      .where({ code })
      .select('Name', 'HeadOfState');
    return res;
  } catch (e) {
    return JSON.stringify(e);
  }
};

const getCitiesByCountry = async (request, h) => {
  const { code } = request.params;
  try {
    /*
    SELECT co.Name, ci.Name, ci.Population
    FROM country AS co
    INNER JOIN city AS ci
    ON ci.CountryCode = co.Code
    WHERE co.Code = USA
    */
    const res = await knex
      .select('co.Name', 'ci.Name', 'ci.Population')
      .from('country AS co')
      .innerJoin('city AS ci', function () {
        this.on('ci.CountryCode', '=', 'co.Code');
      })
      .where('co.Code', '=', code);
    return res;
  } catch (e) {
    return JSON.stringify(error);
  }
};

module.exports = {
  listAllCountries,
  listOneCountry,
  getCitiesByCountry,
};
