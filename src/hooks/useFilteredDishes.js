import { useState, useEffect, useContext } from 'react'
import DishesContext from '../../context/dishes-context'
import PantryContext from '../../context/pantry-context'
import useDishes from '../hooks/useDishes'
import usePantryIngredients from './usePantryIngredients'
import FiltersContext from '../../context/filters-context'

const useFilteredDishes = () => {
    const dishes = useDishes()
    const { filters } = useContext(FiltersContext)

    const filteredDishes = filters ? dishes
        .filter(dish => 
            dish.name.toLowerCase().includes(filters.text.toLowerCase()) &&
            dish.keyIngredients.some(keyIngredient => keyIngredient.includes(filters.keyIngredients)) &&
            dish.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase()) &&
            dish.type.toLowerCase().includes(filters.dishType.toLowerCase())
        )
        :
            dishes
    
    return filteredDishes
}

export default useFilteredDishes