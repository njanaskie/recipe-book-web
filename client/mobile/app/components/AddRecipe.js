import React from 'react'
import { View } from "react-native";
import RecipeForm from './RecipeForm'
import { useRecipesContext } from '../context/recipes-context'
import { addRecipeService } from '../services/recipeServices'

const AddRecipe = () => {
    const { recipes, recipeDispatch } = useRecipesContext()
    // const history = useHistory()

    const onSubmit = async (recipe) => {
        // addRecipe(recipe)
        const newRecipe = await addRecipeService(recipe)
        recipeDispatch({ type: 'ADD_RECIPE', recipe: {id: newRecipe.id, ...recipe} })
        // history.push('/')
    }

    return (
        <View>
            <RecipeForm
                onSubmit={onSubmit}
                // results={recipes}
            />
        </View>
    )
}

export default AddRecipe