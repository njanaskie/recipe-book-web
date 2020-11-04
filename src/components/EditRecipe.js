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

const EditRecipe = () => {
    const { recipeDispatch } = useRecipesContext()
    const history = useHistory()
    const { user } = useFirebaseContext()
    const { id } = useParams()
    const results = useAllRecipes()
    const recipe = results.recipes.find((recipe) => recipe.id === id)

    const onSubmit = (editRecipe) => {
        database.collection('users').doc(user.uid).collection('recipes').doc(recipe.id).update(editRecipe).then(() => {
            recipeDispatch({ type: 'EDIT_RECIPE', id: editRecipe.id, editRecipe })
            history.push('/')

            // handleModalClose()
            // console.log('edit user recipe', editRecipe)
        })
    }

    return (
        <div className='content-container'>
            <div className='form-container form-title'>
                <h3>Edit recipe details...</h3>
            </div>
            <RecipeForm
                {...recipe}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default EditRecipe