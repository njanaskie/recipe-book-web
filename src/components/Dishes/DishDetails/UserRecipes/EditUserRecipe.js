import React, { useContext, useEffect } from 'react'
import UserRecipeForm from './UserRecipeForm'
import database from '../../../../firebase/firebase'
import FirebaseContext from '../../../../../context/firebase-context'
import RecipesContext from '../../../../../context/recipes-context'

const EditUserRecipe = ({ recipe }) => {
    const { recipeDispatch } = useContext(RecipesContext)
    const { user } = useContext(FirebaseContext)
    // const recipe = recipes.find((recipe) => recipe.id === )

    const onSubmit = (recipe) => {
        // database.collection('dishes').doc(id).update(dish).then(() => {
        //     dishDispatch({ type: 'EDIT_DISH', id: dish.id, dish })
        //     history.push('/dishes')
        // })
    }

    console.log('edit user recipe')

    return (
        <div>
            <UserRecipeForm
                {...recipe}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default EditUserRecipe