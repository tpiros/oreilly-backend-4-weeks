// must use .mjs extension, or set "module: true" in `package.json`
// import sum from './math.mjs';
import sum, { add } from './math.mjs';

console.log(sum(4, 5, 6));
console.log(add(5, 6));
