const util = require('util');

const obj = {
  name: 'John',
  address: {
    street: '1 Main Street',
    city: 'London',
    region: {
      name: 'Greater London',
    },
    zip: 'EC1 8BB',
  },
  data: {
    admin: {
      photo: {
        url: 'john.jpg',
      },
    },
  },
};

console.log(obj);

console.log(util.inspect(obj, { colors: true, depth: null }));
