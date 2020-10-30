import { useState, useEffect, useContext } from 'react'
import DishesContext from '../../context/dishes-context'
import PantryContext from '../../context/pantry-context'
import useRecipes from './useRecipes'
import usePantryIngredients from './usePantryIngredients'
import FiltersContext from '../../context/filters-context'
import useAllRecipes from './useAllRecipes'

const useFilteredReipes = () => {
    // const recipes = useRecipes()
    const results = useAllRecipes()
    const { filters } = useContext(FiltersContext)

    const recipes = filters ? results.recipes
        .filter(recipe => 
            // recipe.name.toLowerCase().includes(filters.text.toLowerCase()) &&
            recipe.ingredients.some(ingredient => ingredient.includes(filters.ingredients)) &&
            recipe.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase()) &&
            recipe.type.toLowerCase().includes(filters.recipeType.toLowerCase())
        )
        :
        results.recipes
    
    return { recipes }
}

export default useFilteredReipes