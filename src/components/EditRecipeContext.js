import React, { useContext, useReducer } from 'react'
import RecipesContext from '../../context/recipes-context'
import recipesReducer from '../reducers/recipes'
import IngredientsContext from '../../context/ingredients-context'
import ingredientsReducer from '../reducers/ingredients'
import EditRecipe from './EditRecipe'

const EditRecipeContext = () => {
    const [recipes, recipeDispatch] = useReducer(recipesReducer, [])
    const [ingredients, dispatch ] = useReducer(ingredientsReducer, [])

    return (
        <div>
            <IngredientsContext.Provider value={{ ingredients, dispatch }}>
                <RecipesContext.Provider value={{ recipes, recipeDispatch }}>
                    <EditRecipe/>
                </RecipesContext.Provider>
            </IngredientsContext.Provider>
        </div>
    )
}

export default EditRecipeContext