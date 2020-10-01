import React, { useContext, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import RecipeForm from './RecipeForm'
import database from '../firebase/firebase'
import FirebaseContext from '../../context/firebase-context'
import useRecipesContext from '../../context/recipes-context'
import RecipesContext from '../../context/recipes-context'
import recipesReducer from '../reducers/recipes'
import IngredientsContext from '../../context/ingredients-context'
import ingredientsReducer from '../reducers/ingredients'

const AddRecipe = ({ handleModalClose }) => {
    const { recipeDispatch } = useContext(useRecipesContext)
    const { user } = useContext(FirebaseContext)
    const history = useHistory()

    const onSubmit = (recipe) => {
        database.collection('users').doc(user.uid).collection('recipes').add(recipe).then((ref) => {
            recipeDispatch({ type: 'ADD_RECIPE', recipe: {id: ref.key, ...recipe} })
            history.push('/')
            // handleModalClose()
        })
    }

    return (
        <div>
            <RecipeForm
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default AddRecipe