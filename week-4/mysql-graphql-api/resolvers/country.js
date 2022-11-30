// const fetch = (...args) =>
//   import('node-fetch').then(({ default: fetch }) => fetch(...args));
const base = `http://localhost:3000/api`;
module.exports = {
  Query: {
    // please note that the below returns *every column*
    countries: async () => {
      const response = await fetch(`${base}/countries`);
      const data = await response.json();

      return data;
    },
    country: async (parent, { code }) => {
      const response = await fetch(`${base}/countries/${code}`);
      const data = await response.json();
      return data;
    },
  },
  Country: {
    citylist: async (parent) => {
      const { Code } = parent;

      const response = await fetch(`${base}/countries/${Code}/cities`);
      const data = await response.json();

      return data;
    },
  },
};
