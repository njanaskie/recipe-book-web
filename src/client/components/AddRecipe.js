import React from 'react'
import { useHistory } from 'react-router-dom'
import RecipeForm from './RecipeForm'
import { useRecipesContext } from '../context/recipes-context'
import { addRecipeService } from '../services/recipeServices'

const AddRecipe = () => {
    const { recipes, addRecipe, recipeDispatch } = useRecipesContext()
    const history = useHistory()

    const onSubmit = (recipe) => {
        // addRecipe(recipe)
        addRecipeService(recipe)
        recipeDispatch({ type: 'ADD_RECIPE', recipe })
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