import React, { useContext, useReducer } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import RecipeForm from './RecipeForm'
import database from '../firebase/firebase'
import FirebaseContext from '../../context/firebase-context'
import useRecipesContext from '../../context/recipes-context'
import RecipesContext from '../../context/recipes-context'
import recipesReducer from '../reducers/recipes'
import IngredientsContext from '../../context/ingredients-context'
import ingredientsReducer from '../reducers/ingredients'
import useRecipes from '../hooks/useRecipes'

const EditRecipe = () => {
    // const [recipes, recipeDispatch] = useReducer(recipesReducer, [])
    // const [ingredients, dispatch ] = useReducer(ingredientsReducer, [])
    const { id } = useParams()
    const allRecipes = useRecipes()
    const recipe = allRecipes.find((recipe) => recipe.id === id)

    console.log(recipe)

    const onSubmit = (recipe) => {
        database.collection('users').doc(user.uid).collection('recipes').doc(recipe.id).update(recipe).then(() => {
            recipeDispatch({ type: 'EDIT_RECIPE', id: recipe.id, recipe })

            // handleModalClose()
            // console.log('edit user recipe', editRecipe)
        })
    }

    return (
        <div>
            <RecipeForm
                {...recipe}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default EditRecipe