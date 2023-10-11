/**
 *
 * @param {object} recipe Recipe object
 * @param {Array} items
 * @param {Array} machines
 * @returns {string}
 */
export const recipeChart = (recipe, items, machines) => {
  console.log(recipe, items);
  if (!recipe) return '';
  const itemsMin = 60 / recipe.craftTime;
  let graphString = `graph LR;
    ${recipe.slug}([${machines[recipe.producedIn]?.name || 'Workshop'}])`;

  console.log(graphString);

  recipe.ingredients.forEach((ingredient) => {
    graphString += `
    ${ingredient.itemClass}[${ingredient.quantity} x ${items[ingredient.itemClass].name}] -->|${
      ingredient.quantity * itemsMin
    } p.m.| ${recipe.slug}`;
  });

  recipe.products.forEach((product) => {
    graphString += `
    ${recipe.slug} -->|${product.quantity * itemsMin} p.m.| ${product.itemClass}[${
      product.quantity
    } x ${items[product.itemClass].name}]
    `;
  });

  console.log(graphString);

  return graphString;
};
