import React from 'react'
import { useHistory } from 'react-router-dom'
import RecipeForm from './RecipeForm'
import { useRecipesContext } from '../context/recipes-context'
import { editRecipeService } from '../services/recipeServices'

const EditRecipe = ({ recipe }) => {
    const { recipes, editRecipe, recipeDispatch } = useRecipesContext()
    const history = useHistory()

    const onSubmit = (recipeEdits) => {
        // editRecipe(recipe.id, recipeEdits)
        editRecipeService(recipe.id, recipeEdits)
        recipeDispatch({ type: 'EDIT_RECIPE', id: recipe.id, updates: recipeEdits })
        history.push('/')
    }

    return (
        <div className='content-container'>
            <RecipeForm
                {...recipe}
                onSubmit={onSubmit}
                results={recipes}
            />
        </div>
    )
}

export default EditRecipe