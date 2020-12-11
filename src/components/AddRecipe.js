import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import uuid from 'uuid'
import RecipeForm from './RecipeForm'
import database from '../firebase/firebase'
import FirebaseContext from '../../context/firebase-context'
import { useRecipesContext } from '../../context/recipes-context'

const AddRecipe = () => {
    const { recipes, recipeDispatch } = useRecipesContext()
    const { user } = useContext(FirebaseContext)
    const history = useHistory()
    const customId = uuid()

    const onSubmit = (recipe) => {
        database.collection('users').doc(user.uid).collection('recipes').doc(customId).set(recipe).then((ref) => {
            recipeDispatch({ type: 'ADD_RECIPE', recipe: {id: customId, ...recipe} })
            history.push('/')
        })
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