import React, { useContext, useReducer } from 'react'
import RecipeForm from './RecipeForm'
import database from '../firebase/firebase'
import FirebaseContext from '../../context/firebase-context'
import useRecipesContext from '../../context/recipes-context'
import RecipesContext from '../../context/recipes-context'
import recipesReducer from '../reducers/recipes'
import IngredientsContext from '../../context/ingredients-context'
import ingredientsReducer from '../reducers/ingredients'

const EditRecipe = ({ recipe }) => {
    const [recipes, recipeDispatch] = useReducer(recipesReducer, [])
    const [ingredients, dispatch ] = useReducer(ingredientsReducer, [])
    // const recipe = recipes.find((recipe) => recipe.id === )

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
            <IngredientsContext.Provider value={{ ingredients, dispatch }}>
                <RecipesContext.Provider value={{ recipes, recipeDispatch }}>
                    <RecipeForm
                        {...recipe}
                        onSubmit={onSubmit}
                    />
                </RecipesContext.Provider>
            </IngredientsContext.Provider>
        </div>
    )
}

export default EditRecipe