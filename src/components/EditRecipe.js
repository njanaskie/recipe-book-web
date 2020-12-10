import React, { useContext, useReducer } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import RecipeForm from './RecipeForm'
import database from '../firebase/firebase'
import { useFirebaseContext } from '../../context/firebase-context'
import { useRecipesContext } from '../../context/recipes-context'
import RecipesContext from '../../context/recipes-context'
import recipesReducer from '../reducers/recipes'
import IngredientsContext from '../../context/ingredients-context'
import ingredientsReducer from '../reducers/ingredients'
import useAllRecipes from '../hooks/useAllRecipes'

const EditRecipe = ({ recipe, handleModalClose }) => {
    const { recipes, recipeDispatch } = useRecipesContext()
    const history = useHistory()
    const { user } = useFirebaseContext()
    const { id } = useParams()
    // const recipe = recipes.find((recipe) => recipe.id === id)

    const onSubmit = (editRecipe) => {
        database.collection('users').doc(user.uid).collection('recipes').doc(recipe.id).update(editRecipe).then(() => {
            recipeDispatch({ type: 'EDIT_RECIPE', id: recipe.id, editRecipe })

            history.push('/')
            // handleModalClose()
        })
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