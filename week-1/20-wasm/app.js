const factory = require('./math.js');

factory().then((instance) => {
  console.log(instance._square(5));
  console.log(instance._cube(2));
});
