
export default (ingredients) => {
    return ingredients.filter(ingredient => ingredient.id !== undefined
    ).sort((a, b) => a.category > b.category ? 1 : -1)
}