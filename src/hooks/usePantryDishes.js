import { useState, useEffect, useRef } from 'react'
import DishesContext from '../../context/dishes-context'
import PantryContext from '../../context/pantry-context'
import useDishes from '../hooks/useDishes'
import usePantryIngredients from './usePantryIngredients'
import useFilteredDishes from '../hooks/useFilteredDishes'

const usePantryDishes = () => {
    const dishes = useFilteredDishes()
    const pantryIngredients = usePantryIngredients()
    const pantryIngredientNames = pantryIngredients.map(ingredient => ingredient.name)
    const pantryDishes = dishes.filter(dish => dish.keyIngredients.every(keyIngredient => pantryIngredientNames.includes(keyIngredient)))

    return pantryDishes
}

export default usePantryDishes