const fs = require('fs');

// console.log('hello node');
// fs.readFile('ingredients.txt', 'utf8', function (error, data) {
//   console.log(data);
// });
// console.log('end of programme');

console.log('hello node');
const data = fs.readFileSync('ingredients.txt', 'utf8');
console.log(data);
console.log('end of programme');
