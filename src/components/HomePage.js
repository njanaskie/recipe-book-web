import React, { useReducer } from 'react'
import RecipeList from './RecipeList'
import RecipeListFilters from './RecipeListFilters'
import useAllRecipes from '../hooks/useAllRecipes'
import useIngredients from '../hooks/useIngredients'
import { useRecipesContext } from '../../context/recipes-context'
import { useIngredientsContext } from '../../context/ingredients-context'

const HomePage = () => {
    // const recipes = useAllRecipes()
    // const ingredients = useIngredients()
    const { recipes, recipeDispatch } = useRecipesContext()
    const { ingredients } = useIngredientsContext()
    // const cachedHits = JSON.parse(localStorage.getItem('recipes'))

    // React.useEffect(() => {
    //     // const recipesData = JSON.parse(localStorage.getItem('recipes'))
    //     const cachedHits = JSON.parse(localStorage.getItem('recipes'))
    
    //     // if (recipesData) {
    //     if (cachedHits) {
    //         console.log('tsteskj')
    //         recipeDispatch({ type: 'SET_RECIPES', recipes: cachedHits })
    //     }
    //     // }
    // }, [])

    // React.useEffect(() => {
    //     const dispatchData = async () => {
    //         console.log('set recipes')
    //         await recipeDispatch({ type: 'SET_RECIPES', recipes})

    //     }

    //     dispatchData()
    //     // localStorage.setItem('recipes', JSON.stringify(recipes));
    // }, [])

    // const results = useAllRecipes()
    // const allIngredients = useIngredients()

    console.log(recipes)

    return (
        <div>
            <RecipeListFilters results={recipes} allIngredients={ingredients}/>
            <RecipeList />
        </div>
    )

};

export default HomePage;