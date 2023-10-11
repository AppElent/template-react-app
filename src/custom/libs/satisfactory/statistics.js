import { getSatisfactoryData, getSatisfactoryDataArray } from '.';
import { createGuid } from '../create-guid';

// inputobject: [{recipe: 'class', amount: 2}]
export const getFactoryStatistics = (factoryItems, version) => {
  // Retrieve static reference data
  const productionRecipes = getSatisfactoryData('recipes', version);
  const products = getSatisfactoryData('items', version);

  // Create empty object with arrays
  const returnObject = {
    inputs: [],
    outputs: [],
    total: [],
    totalInputs: [],
    totalOutputs: [],
  };

  // Iterate factoryItems and check all recipes
  factoryItems?.forEach((recipe) => {
    const foundRecipe = productionRecipes[recipe.recipe];
    if (foundRecipe) {
      const itemsPerMinute = 60 / foundRecipe?.craftTime || 0;
      // Check input
      foundRecipe.ingredients.forEach((ingredient) => {
        const productData = {
          product: ingredient.itemClass,
          quantity: ingredient.quantity * parseFloat(recipe.amount) * -1,
          quantityMin: itemsPerMinute * ingredient.quantity * parseFloat(recipe.amount) * -1,
        };
        returnObject.inputs.push(productData);
        const foundIngredientIndex = returnObject.total.findIndex(
          (x) => x.product === ingredient.itemClass
        );
        if (foundIngredientIndex > -1) {
          returnObject.total[foundIngredientIndex].quantity += productData.quantity;
          returnObject.total[foundIngredientIndex].quantityMin += productData.quantityMin;
        } else {
          returnObject.total.push(productData);
        }
      });

      // Check output
      foundRecipe.products.forEach((product) => {
        const productData = {
          product: product.itemClass,
          quantity: product.quantity * parseFloat(recipe.amount),
          quantityMin: itemsPerMinute * product.quantity * parseFloat(recipe.amount),
        };
        returnObject.outputs.push(productData);
        const foundIngredientIndex = returnObject.total.findIndex(
          (x) => x.product === product.itemClass
        );
        if (foundIngredientIndex > -1) {
          returnObject.total[foundIngredientIndex].quantity += productData.quantity;
          returnObject.total[foundIngredientIndex].quantityMin += productData.quantityMin;
        } else {
          returnObject.total.push(productData);
        }
      });
    }
  });
  returnObject.total.forEach((prod) => {
    if (prod.quantityMin > 0) {
      returnObject.totalOutputs.push(prod);
    } else if (prod.quantityMin < 0) {
      const inverted = {
        ...prod,
        quantityMin: prod.quantityMin * -1,
        quantity: prod.quantity * -1,
      };
      returnObject.totalInputs.push(inverted);
    }
  });
  return returnObject;
};

export const getRecipesByProduct = (
  productList,
  preferredProducts = [],
  version,
  logger = console
) => {
  const products = getSatisfactoryData('items', version);
  const resources = getSatisfactoryData('resources', version);
  const recipes = getSatisfactoryDataArray('recipes', version);
  const recipeObject = getSatisfactoryData('recipes', version);
  const returnObject = {
    total: [],
    // {product: class, recipe: class}
    products: preferredProducts,
    usedRecipes: [],
    alternatives: [],
    excess: [],
    ores: [],
  };
  logger.log(
    'getRecipesByProduct started (productList, preferredProducts, version)',
    productList,
    preferredProducts,
    version
  );
  const getRecipes = (p, itemsMin, neededFor) => {
    const product = products[p];
    logger.log(
      `----------------------------------------------------------------
    product is `,
      product
    );
    if (!product) return;

    let foundRecipe;
    let foundRecipes;
    // If product is found in product Array, look for that recipe
    const preferredRecipe = returnObject.products.find((localProd) => localProd.product === p);
    if (preferredRecipe) {
      //Implement logic to add this recipe
      foundRecipe = recipes.find((r) => r.className === preferredRecipe.recipe);
    } else {
      // Look at all recipes that are not alternate and that have this product (p) as output
      // We also exclude all slugs that have package or unpackage in the name, because this creates an endless loop
      foundRecipes = recipes.filter(
        (recipe) =>
          !recipe.isAlternate &&
          !recipe.slug.includes('package-') &&
          recipe.products.find((prod) => prod.itemClass === p)
      );
      foundRecipe = foundRecipes[0];
    }

    logger.log(
      'Looking for recipe. Searching for 1. preferred-recipe or 2. default recipe (foundrecipe). If recipe is not found, it probably means that it is an ore',
      foundRecipe
    );

    // If recipe found, add to array
    if (foundRecipe && !resources[p]) {
      // Add recipe to used list
      if (
        !returnObject.usedRecipes.find(
          (rec) => rec.product === p && rec.recipe === foundRecipe.className
        )
      ) {
        returnObject.usedRecipes.push({
          product: p,
          recipe: foundRecipe.className,
          recipes: foundRecipes?.map((r) => r.className),
        });
      }

      // If there are more than 1 recipes found, this means that there are more than 1 default recipes. Add to alternatives list
      if (foundRecipes?.length > 1 && !returnObject.alternatives.find((rec) => rec.product === p)) {
        returnObject.alternatives.push({
          product: p,
          recipes: foundRecipes
            .filter((r) => r.className !== foundRecipe.className)
            .map((r) => r.className),
        });
      }

      // Set variables
      const amount = itemsMin;
      const productQuantity = foundRecipe.products.find((prod) => prod.itemClass === p).quantity;
      const cyclesMin = parseFloat(60 / foundRecipe.craftTime);
      logger.log(
        'Setting variables (amount, productQuantity, cyclesMin)',
        amount,
        productQuantity,
        cyclesMin
      );

      // If recipe is already part of array, update
      const index = returnObject.total.findIndex((total) => total.recipe === foundRecipe.className);
      if (index > -1) {
        // Add amount to current amount and add needed for
        returnObject.total[index].amount += amount;
        const prodIndex = returnObject.total[index].products.findIndex(
          (x) => x.product === neededFor
        );
        if (prodIndex === -1) {
          returnObject.total[index].products.push({ amount, product: neededFor });
        } else {
          logger.log(returnObject.total[index].products, amount, prodIndex);
          returnObject.total[index].products[prodIndex].amount += amount;
        }
        //if (returnObject.total[index].products.find((x) => x.product === neededFor))
      } else {
        // If not part of array, push it
        returnObject.total.push({
          amount,
          recipe: foundRecipe.className,
          products: [{ amount, product: neededFor }],
        });
      }
      logger.log('Adding ' + p + ' to total array');

      // Find excess products and add to excess list
      const excessProducts = foundRecipe.products.filter(
        (excessProduct) => excessProduct.itemClass !== p
      );
      if (excessProducts.length > 0) {
        logger.log(
          'Excess products found (recipe, product, excess-products)',
          foundRecipe,
          p,
          excessProducts
        );
        excessProducts.forEach((excessProduct, i) => {
          // If excess product is present, add to it
          const excessProductIndex = returnObject.excess.findIndex(
            (product) => product.product === excessProduct.itemClass
          );
          if (excessProductIndex > -1) {
            returnObject.excess[excessProductIndex].amount += cyclesMin * excessProduct.quantity;
            if (
              returnObject.excess[excessProductIndex].recipes &&
              !returnObject.excess[excessProductIndex].recipes?.find(
                (r) => r === foundRecipe.className
              )
            ) {
              returnObject.excess[excessProductIndex].recipes.push(foundRecipe.className);
            }
          } else {
            returnObject.excess.push({
              amount: cyclesMin * excessProduct.quantity,
              product: excessProduct.itemClass,
              recipes: [foundRecipe.className],
            });
          }
        });
      }

      // If there are ingredients, re-iterate
      if (foundRecipe.ingredients) {
        logger.log(
          'Re-iterating for ingredients of recipe ' + foundRecipe.className,
          foundRecipe.ingredients
        );
        foundRecipe.ingredients.forEach((ingredient) => {
          const multiplier = ingredient.quantity / productQuantity;
          const amountIngredient = itemsMin * multiplier;
          getRecipes(ingredient.itemClass, amountIngredient, p);
        });
      }
    } else {
      // If recipe is not found, it probably means that it is an Ore, so just add it
      const oreIndex = returnObject.ores.findIndex((ore) => ore.ore === p);
      if (oreIndex > -1) {
        // Add ore amount to current amount
        returnObject.ores[oreIndex].amount += itemsMin;
        const oreProductIndex = returnObject.ores[oreIndex].products.findIndex(
          (n) => n.product === neededFor
        );
        if (oreProductIndex === -1) {
          returnObject.ores[oreIndex].products.push({ amount: itemsMin, product: neededFor });
        } else {
          returnObject.ores[oreIndex].products[oreProductIndex].amount += itemsMin;
        }
      } else {
        returnObject.ores.push({
          amount: itemsMin,
          ore: p,
          products: [{ amount: itemsMin, product: neededFor }],
        });
      }
    }
  };
  productList.forEach((listItem) => {
    getRecipes(listItem.product, listItem.amount, createGuid(false));
  });

  returnObject.total.forEach((ret, index) => {
    const recipe = recipeObject[ret.recipe];
    const cyclesMin = parseFloat(60 / recipe.craftTime);
    returnObject.total[index].numberOfMachines = +parseFloat(ret.amount / cyclesMin).toFixed(4);
  });
  logger.log('Result', returnObject);
  return returnObject;
};
