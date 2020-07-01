import React, { useContext, useEffect } from 'react'
import UserRecipeForm from './UserRecipeForm'
import database from '../../../../firebase/firebase'
import FirebaseContext from '../../../../../context/firebase-context'
import RecipesContext from '../../../../../context/recipes-context'

const AddUserRecipe = ({ dish, handleModalClose }) => {
    const { recipeDispatch } = useContext(RecipesContext)
    const { user } = useContext(FirebaseContext)

    const onSubmit = (recipe) => {
        database.collection('users').doc(user.uid).collection('recipes').add(recipe).then((ref) => {
            recipeDispatch({ type: 'ADD_RECIPE', recipe: {id: ref.key, ...recipe} })

            handleModalClose()
        })

        
    }

    console.log('add user recipe')

    return (
        <div>
            <UserRecipeForm
                onSubmit={onSubmit}
                dish={dish}
            />
        </div>
    )
}

export default AddUserRecipe