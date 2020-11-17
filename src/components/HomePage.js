import React, { useReducer } from 'react'
import RecipeList from './RecipeList'
import RecipeListFilters from './RecipeListFilters'
import useAllRecipes from '../hooks/useAllRecipes'
import useIngredients from '../hooks/useIngredients'


const HomePageContext = () => {
    const results = useAllRecipes()
    const allIngredients = useIngredients()

    return (
        <div>
            <RecipeListFilters results={results} allIngredients={allIngredients}/>
            <RecipeList results={results}/>
        </div>
    )

};

export default HomePageContext;