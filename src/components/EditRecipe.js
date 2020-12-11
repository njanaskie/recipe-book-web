import React from 'react'
import { useHistory } from 'react-router-dom'
import RecipeForm from './RecipeForm'
import database from '../firebase/firebase'
import { useFirebaseContext } from '../../context/firebase-context'
import { useRecipesContext } from '../../context/recipes-context'

const EditRecipe = ({ recipe }) => {
    const { recipes, recipeDispatch } = useRecipesContext()
    const history = useHistory()
    const { user } = useFirebaseContext()

    const onSubmit = (editRecipe) => {
        database.collection('users').doc(user.uid).collection('recipes').doc(recipe.id).update(editRecipe).then(() => {
            recipeDispatch({ type: 'EDIT_RECIPE', id: recipe.id, editRecipe })
            history.push('/')
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