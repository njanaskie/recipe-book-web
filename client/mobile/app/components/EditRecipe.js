import React from 'react'
import RecipeForm from './RecipeForm'
import { useRecipesContext } from '../context/recipes-context'
import { editRecipeService } from '../services/recipeServices'
import { View } from 'react-native'

const EditRecipe = ({ recipe, closeEditModal }) => {
    const { recipes, editRecipe, recipeDispatch } = useRecipesContext()
    // const history = useHistory()

    const onSubmit = (recipeEdits) => {
        // editRecipe(recipe.id, recipeEdits)
        editRecipeService(recipe.id, recipeEdits)
        recipeDispatch({ type: 'EDIT_RECIPE', id: recipe.id, updates: recipeEdits })
        closeEditModal()
    }

    return (
        <View>
            <RecipeForm
                {...recipe}
                onSubmit={onSubmit}
                results={recipes}
            />
        </View>
    )
}

export default EditRecipe