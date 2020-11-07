export default (recipes, filters) => {
    return filters ? recipes.filter((recipe) => {
        const ingredientMatch = recipe.ingredients.some(ingredient => ingredient.includes(filters.ingredients))
        const cuisineMatch = recipe.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase())
        const typeMatch = recipe.type.toLowerCase().includes(filters.recipeType.toLowerCase())
        const customTagMatch = filters.customTags.length > 0 ? recipe.customTags.some(tag => tag.includes(filters.customTags)) : true
        return ingredientMatch && cuisineMatch && typeMatch && customTagMatch
    })
    :
    recipes
}