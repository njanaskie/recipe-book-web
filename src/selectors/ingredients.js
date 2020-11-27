
export default (ingredients) => {
    return ingredients.filter(ingredient => ingredient.id !== undefined
    )
    .sort((a, b) => {
        if (a.category === b.category) {
            return b.category - a.category
        }
         return a.category > b.category ? 1 : -1
    })
}