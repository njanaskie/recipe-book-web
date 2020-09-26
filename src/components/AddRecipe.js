import React, { useContext, useReducer } from 'react'
import RecipeForm from './RecipeForm'
import database from '../firebase/firebase'
import FirebaseContext from '../../context/firebase-context'
import useRecipesContext from '../../context/recipes-context'
import RecipesContext from '../../context/recipes-context'
import recipesReducer from '../reducers/recipes'
import IngredientsContext from '../../context/ingredients-context'
import ingredientsReducer from '../reducers/ingredients'

const AddRecipe = ({ handleModalClose }) => {
    // const { recipeDispatch } = useContext(useRecipesContext)
    const [recipes, recipeDispatch] = useReducer(recipesReducer, [])
    const [ingredients, dispatch ] = useReducer(ingredientsReducer, [])
    const { user } = useContext(FirebaseContext)

    const onSubmit = (recipe) => {
        database.collection('users').doc(user.uid).collection('recipes').add(recipe).then((ref) => {
            recipeDispatch({ type: 'ADD_RECIPE', recipe: {id: ref.key, ...recipe} })

            // handleModalClose()
        })

        
    }

    return (
        <div>
            <IngredientsContext.Provider value={{ ingredients, dispatch }}>
                <RecipesContext.Provider value={{ recipes, recipeDispatch }}>
                    <RecipeForm
                        onSubmit={onSubmit}
                        // dish={dish}
                    />
                </RecipesContext.Provider>
            </IngredientsContext.Provider>
        </div>
    )
}

export default AddRecipe