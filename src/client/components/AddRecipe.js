import React from 'react'
import { useHistory } from 'react-router-dom'
import RecipeForm from './RecipeForm'
import { useRecipesContext } from '../context/recipes-context'
import { addRecipeService } from '../services/recipeServices'
import uuid from 'uuid'

const AddRecipe = () => {
    const { recipes, addRecipe, recipeDispatch } = useRecipesContext()
    const history = useHistory()
    const customId = uuid()

    const onSubmit = async (recipe) => {
        // addRecipe(recipe)
        const newRecipe = await addRecipeService(recipe)
        recipeDispatch({ type: 'ADD_RECIPE', recipe: {id: newRecipe.id, ...recipe} })
        history.push('/')
    }

    return (
        <div>
            <RecipeForm
                onSubmit={onSubmit}
                results={recipes}
            />
        </div>
    )
}

export default AddRecipe