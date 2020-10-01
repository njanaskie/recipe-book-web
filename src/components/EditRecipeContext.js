import React, { useContext, useReducer } from 'react'
import RecipesContext from '../../context/recipes-context'
import recipesReducer from '../reducers/recipes'
import IngredientsContext from '../../context/ingredients-context'
import ingredientsReducer from '../reducers/ingredients'
import FiltersContext from '../../context/filters-context'
import filtersReducer from '../reducers/filters'
import EditRecipe from './EditRecipe'

const EditRecipeContext = () => {
    const [recipes, recipeDispatch] = useReducer(recipesReducer, [])
    const [ingredients, dispatch ] = useReducer(ingredientsReducer, [])
    const [filters, filtersDispatch ] = useReducer(filtersReducer, [])

    return (
        <div>
            <IngredientsContext.Provider value={{ ingredients, dispatch }}>
                <RecipesContext.Provider value={{ recipes, recipeDispatch }}>
                    <FiltersContext.Provider value={{ filters, filtersDispatch}}>
                        <EditRecipe/>
                    </FiltersContext.Provider>
                </RecipesContext.Provider>
            </IngredientsContext.Provider>
        </div>
    )
}

export default EditRecipeContext