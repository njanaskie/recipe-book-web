import React from 'react'
import { useHistory } from 'react-router-dom'
import RecipeForm from './RecipeForm'
import { useRecipesContext } from '../../context/recipes-context'

const EditRecipe = ({ recipe }) => {
    const { recipes, editRecipe } = useRecipesContext()
    const history = useHistory()

    const onSubmit = (recipeEdits) => {
        editRecipe(recipe.id, recipeEdits)
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