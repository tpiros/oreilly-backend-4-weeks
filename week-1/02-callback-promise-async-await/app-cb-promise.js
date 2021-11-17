const fs = require('fs');

const ingredientList = (file, colour, callback = () => {}) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (error, content) => {
      if (error) {
        reject(error);
        return callback(error);
      }
      let ingredients = content.split('\n');
      if (colour) {
        ingredients = ingredients.filter(
          (ingredient) => ingredient.split(' ')[0] === colour
        );
      }
      resolve(ingredients);
      callback(null, ingredients);
    });
  });
};

ingredientList('ingredients.txt', 'red')
  .then((ingredients) => console.log(ingredients))
  .catch((error) => console.log(error));

// ingredientList('ingredients.txt', 'yellow', (error, ingredients) =>
//   console.log(ingredients)
// );
