const { fork } = require('child_process');
const fib = fork('fibonacci.js');

console.log('start here');
fib.send(42);
fib.on('message', (fibonacciValue) => console.log(fibonacciValue));
console.log('end here');
