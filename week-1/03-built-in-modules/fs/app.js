const fs = require('fs');

fs.readFile('./file.txt', 'utf8', (err, fileContent) => {
  console.log(fileContent);
});
