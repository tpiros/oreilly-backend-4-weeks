import { readFileSync } from 'fs';

const content = readFileSync('./file.txt', 'utf8');
console.log(content);
