const add = (n1, n2) => n1 + n2;
const multiply = (n1, n2) => n1 * n2;
const sum = (...n) => n.reduce((previous, current) => previous + current);

const PI = 3.14;

module.exports = {
  add,
  multiply,
  sum,
  PI,
};
