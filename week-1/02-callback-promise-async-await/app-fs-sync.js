const fs = require('fs');

const ingredientList = (file, colour) => {
  const content = fs.readFileSync(file, 'utf8');
  let ingredients = content.split('\n');
  if (colour) {
    ingredients = ingredients.filter(
      (ingredient) => ingredient.split(' ')[0] === colour
    );
  }
  return ingredients;
};
const redIngredients = ingredientList('ingredients.txt', 'red');
console.log(redIngredients);
