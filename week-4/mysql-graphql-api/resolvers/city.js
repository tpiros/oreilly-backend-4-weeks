// const fetch = (...args) =>
//   import('node-fetch').then(({ default: fetch }) => fetch(...args));
const base = `http://localhost:3000/api`;
module.exports = {
  Query: {
    // please note that the below returns *every column*
    cities: async () => {
      const response = await fetch(`${base}/cities`);
      const data = await response.json();

      return data;
    },
    city: async (parent, { id }) => {
      const response = await fetch(`${base}/cities/${id}`);
      const data = await response.json();
      return data;
    },
  },
  City: {
    CountryInfo: async (parent) => {
      const { ID } = parent;
      const response = await fetch(`${base}/cities/${ID}/country`);
      const data = await response.json();

      return data;
    },
  },
};
