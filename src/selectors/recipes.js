export default (recipes, filters) => {
    return filters ? recipes.filter((recipe) => {
        const ingredientMatch = recipe.ingredients.some(ingredient => ingredient.includes(filters.ingredients))
        const cuisineMatch = recipe.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase())
        const typeMatch = recipe.type.toLowerCase().includes(filters.recipeType.toLowerCase())
        return ingredientMatch && cuisineMatch && typeMatch
    })
    :
    recipes
}