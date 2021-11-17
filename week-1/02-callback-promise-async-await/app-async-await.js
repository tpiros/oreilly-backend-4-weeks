const fs = require('fs');

const ingredientList = (file, colour) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (error, content) => {
      if (error) {
        reject(error);
      }
      let ingredients = content.split('\n');
      if (colour) {
        ingredients = ingredients.filter(
          (ingredient) => ingredient.split(' ')[0] === colour
        );
      }
      resolve(ingredients);
    });
  });
};

async function showIngredients() {
  try {
    const ingredients = await ingredientList('ingredients.txt', 'green');
    console.log(ingredients);
  } catch (error) {
    console.log(error);
  }
}

showIngredients();
