import React from 'react'
import RecipeList from './RecipeList'
import RecipeListFilters from './RecipeListFilters'
import { useRecipesContext } from '../../context/recipes-context'
import { useIngredientsContext } from '../../context/ingredients-context'

const HomePage = () => {
    const { recipes } = useRecipesContext()
    const { ingredients } = useIngredientsContext()

    return (
        <div>
            <RecipeListFilters results={recipes} allIngredients={ingredients}/>
            <RecipeList />
        </div>
    )

};

export default HomePage;