const fs = require('fs');

const ingredientList = (file, colour, callback) => {
  fs.readFile(file, 'utf8', (error, content) => {
    if (error) {
      return callback(error);
    }
    let ingredients = content.split('\n');
    if (colour) {
      ingredients = ingredients.filter(
        (ingredient) => ingredient.split(' ')[0] === colour
      );
    }
    callback(null, ingredients);
  });
};

ingredientList('ingredients.txt', 'red', (error, ingredients) =>
  console.log(ingredients)
);
