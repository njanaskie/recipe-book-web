import React, { useReducer } from 'react'
import RecipeList from './RecipeList'
import RecipeListFilters from './RecipeListFilters'
import useAllRecipes from '../hooks/useAllRecipes'
import useIngredients from '../hooks/useIngredients'
import { useRecipesContext } from '../../context/recipes-context'
import { useIngredientsContext } from '../../context/ingredients-context'

const HomePageContext = () => {
    const { recipes } = useRecipesContext()
    const { ingredients } = useIngredientsContext()

    // const results = useAllRecipes()
    // const allIngredients = useIngredients()

    return (
        <div>
            <RecipeListFilters results={recipes} allIngredients={ingredients}/>
            <RecipeList results={recipes}/>
        </div>
    )

};

export default HomePageContext;