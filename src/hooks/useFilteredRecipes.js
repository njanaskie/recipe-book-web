import { useState, useEffect, useContext } from 'react'
import DishesContext from '../../context/dishes-context'
import PantryContext from '../../context/pantry-context'
import useRecipes from './useRecipes'
import usePantryIngredients from './usePantryIngredients'
import FiltersContext from '../../context/filters-context'

const useFilteredReipes = () => {
    const recipes = useRecipes()
    const { filters } = useContext(FiltersContext)

    const filteredRecipes = filters ? recipes
        .filter(recipe => 
            // recipe.name.toLowerCase().includes(filters.text.toLowerCase()) &&
            recipe.ingredients.some(ingredient => ingredient.includes(filters.ingredients)) &&
            recipe.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase()) &&
            recipe.type.toLowerCase().includes(filters.recipeType.toLowerCase())
        )
        :
            recipes
    
    return filteredRecipes
}

export default useFilteredReipes