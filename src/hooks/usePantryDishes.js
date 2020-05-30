import { useState, useEffect, useRef } from 'react'
import DishesContext from '../../context/dishes-context'
import PantryContext from '../../context/pantry-context'
import useDishes from '../hooks/useDishes'
import usePantryIngredients from './usePantryIngredients'

// const usePantryDishes = (textFilter) => {
//     const [filteredPantryDishes, setFilteredPantryDishes] = useState([])
//     const dishes = useDishes()
//     const pantryIngredients = usePantryIngredients()
//     const pantryIngredientNames = pantryIngredients.map(ingredient => ingredient.name)
//     const pantryDishes = dishes.filter(dish => dish.keyIngredients.every(keyIngredient => pantryIngredientNames.includes(keyIngredient)))

//     useEffect(() => {
//         const results = pantryDishes.filter(dish => dish.name.toLowerCase().includes(textFilter.toLowerCase()))
//         setFilteredPantryDishes(results)
//     }, [textFilter])

//     console.log(textFilter)
//     console.log(filteredPantryDishes)

//     return filteredPantryDishes
// }

// export default usePantryDishes


const usePantryDishes = () => {
    // const [pantryDishes, setPantryDishes] = useState([])
    // const isCurrent = useRef(true)
    const dishes = useDishes()
    const pantryIngredients = usePantryIngredients()
    const pantryIngredientNames = pantryIngredients.map(ingredient => ingredient.name)

    // useEffect(() => {
    //     return () => {
    //         isCurrent.current = false
    //     }
    // }, [])
    
    const pantryDishes = dishes.filter(dish => dish.keyIngredients.every(keyIngredient => pantryIngredientNames.includes(keyIngredient)))
    

    return pantryDishes
}

export default usePantryDishes