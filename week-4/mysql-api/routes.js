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
  // try {
  //   const r = await knex.select('Name', 'HeadOfState').from('country');
  //   return r;
  // } catch (error) {
  //   return JSON.stringify(error);
  // }
  // with query params
  // if (request.query && request.query.region) {
  //   const region = request.query.region;
  //   const r = await knex('country')
  //     .where({
  //       region,
  //     })
  //     .select('name', 'HeadOfState');
  //   return r;
  // }
  // const r = await knex.select('Name', 'HeadOfState').from('country');
  // return r;
  // order by
  // const { orderBy } = request.query;
  // const columns = [
  //   'Name',
  //   'Continent',
  //   'Region',
  //   'HeadOfState',
  //   'Capital',
  //   'Code',
  // ];
  // if (orderBy) {
  //   const regex = /(.*)(:)(ASC|DESC)/gi;
  //   if (regex.test(orderBy)) {
  //     const [column, order] = orderBy.split(':');
  //     if (columns.includes(column)) {
  //       const r = await knex
  //         .select(columns)
  //         .from('country')
  //         .orderBy(column, order);
  //       return r;
  //     } else {
  //       return JSON.stringify(
  //         `Cannot order by column ${column}. Use the available columns: ${columns}`
  //       );
  //     }
  //   } else {
  //     return JSON.stringify('If using a filter please use [field]:ASC|DESC');
  //   }
  // } else {
  //   const r = await knex.select(columns).from('country');
  //   return r;
  // }
};

const listOneCountry = async (request, h) => {
  const { code } = request.params;
  try {
    const [r] = await knex('country')
      .where({
        code,
      })
      .select('name', 'HeadOfState');
    return r;
  } catch (error) {
    return JSON.stringify(error);
  }
};

const getCitiesByCountry = async (request, h) => {
  const { code } = request.params;
  try {
    const r = await knex
      .select('co.Name', 'ci.Name', 'ci.Population')
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

const createCity = async (request, h) => {
  /*
  Try to insert a document to the database.
  ********

  console.log(request.payload); // returns payload
  try {
    await knex('city').insert(payload)
  }  catch (error) {
    return JSON.stringify(error);
  }
  return h.response(...).code(201); // 201 - Created
  */
};

const updateCountry = async (request, h) => {
  /*
  Try to update a country (via "patch")
  *******
  
  console.log(request.payload); // returns payload
  try {
    const { code } = request.params;
    // check if country exists at the first place
    // then make the update
    await knex('country').where('code', code).update(payload)
    // return the appropriate messages and status codes
  } catch (error) {
    return JSON.stringify(error);
  }
  */
};

const deleteCity = async (request, h) => {
  /*
  Try to delete a country
  *******
  
  try {
    const { code } = request.params;
    // check if country exists at the first place
    // then delete
    await knex('city').where(code).del();
    // return the appropriate messages and status codes
  } catch (error) {
    return JSON.stringify(error);
  }
  */
};

module.exports = {
  listAllCountries,
  listOneCountry,
  getCitiesByCountry,
};
