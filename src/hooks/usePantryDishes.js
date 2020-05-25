import { useContext } from 'react'
import DishesContext from '../../context/dishes-context'
import PantryContext from '../../context/pantry-context'
import useDishes from '../hooks/useDishes'
import usePantryIngredients from './usePantryIngredients'


const usePantryDishes = () => {
    const dishes = useDishes()
    const pantryIngredients = usePantryIngredients()
    const pantryIngredientNames = pantryIngredients.map(ingredient => ingredient.name)
    const pantryDishes = dishes.filter(dish => dish.keyIngredients.every(keyIngredient => pantryIngredientNames.includes(keyIngredient)))

    return pantryDishes
}

export default usePantryDishes