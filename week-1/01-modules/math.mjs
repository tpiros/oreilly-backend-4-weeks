// export const add = (n1, n2) => n1 + n2;
const add = (n1, n2) => n1 + n2;

// export const multiply = (n1, n2) => n1 * n2;
const multiply = (n1, n2) => n1 * n2;

// export const sum = (...n) => n.reduce((previous, current) => previous + current);
const sum = (...n) => n.reduce((previous, current) => previous + current);

// export PI = 3.14;
const PI = 3.14;

// export { add, multiply, sum as sumFunction, PI };
export { add, multiply, sum, PI };

// default export
export default sum;
