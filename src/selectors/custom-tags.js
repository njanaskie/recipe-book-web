export default (recipes) => {
    // const customTags = recipes.recipes.map(recipe => recipe.type)
    // return customTags
    const customTags = []
    var customTagsFinal = []
    
    recipes.map(recipe => {
        if (recipe.customTags.length > 0) {
            recipe.customTags.map(tag => {
                customTags.push(tag)
            })
        }
    })

    // customTagsFinal = recipe.customTags.filter(tag => !(customTags.includes(tag)))

    return customTags.filter((value, index) => customTags.indexOf(value) == index)

}