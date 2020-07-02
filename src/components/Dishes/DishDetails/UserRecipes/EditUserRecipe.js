import React, { useContext, useEffect } from 'react'
import UserRecipeForm from './UserRecipeForm'
import database from '../../../../firebase/firebase'
import FirebaseContext from '../../../../../context/firebase-context'
import RecipesContext from '../../../../../context/recipes-context'

const EditUserRecipe = ({ dish, recipe, handleModalClose }) => {
    const { recipeDispatch } = useContext(RecipesContext)
    const { user } = useContext(FirebaseContext)
    // const recipe = recipes.find((recipe) => recipe.id === )

    const onSubmit = (editRecipe) => {
        database.collection('users').doc(user.uid).collection('recipes').doc(recipe.id).update(editRecipe).then(() => {
            recipeDispatch({ type: 'EDIT_RECIPE', id: editRecipe.id, editRecipe })

            handleModalClose()
            console.log('edit user recipe', editRecipe)
        })
    }

    

    return (
        <div>
            <UserRecipeForm
                {...recipe}
                onSubmit={onSubmit}
                dish={dish}
            />
        </div>
    )
}

export default EditUserRecipe