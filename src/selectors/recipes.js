

export default (recipes) => {
    const ingredientMatch = pantryIngredients.map(ingredient => ingredient.name)
    const cuisineMatch = dishes.filter(dish => dish.keyIngredients.every(keyIngredient => pantryIngredientNames.includes(keyIngredient)))
    const typeMatch = pantryDishesList.map(dish => dish.name)
    return pantryDishesList
}


    const recipes = filters ? results.recipes
    .filter(recipe => 
        // recipe.name.toLowerCase().includes(filters.text.toLowerCase()) &&
        recipe.ingredients.some(ingredient => ingredient.includes(filters.ingredients)) &&
        recipe.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase()) &&
        recipe.type.toLowerCase().includes(filters.recipeType.toLowerCase())
    )