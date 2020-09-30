import React, { useState, useEffect, useRef } from 'react'
import { useDishesContext } from '../../context/dishes-context'
import { useFirebaseContext } from '../../context/firebase-context'
import { usePantryDishContext } from '../../context/pantry-dish-context'
import PantryContext from '../../context/pantry-context'
import useDishes from '../hooks/useDishes'
import usePantryIngredients from '../hooks/usePantryIngredients'
import useFilteredDishes from '../hooks/useFilteredRecipes'
import database, { firebase } from '../firebase/firebase'
import testDishes from '../tests/fixtures/dishes'

export default (pantryIngredients, dishes) => {
    const pantryIngredientNames = pantryIngredients.map(ingredient => ingredient.name)
    const pantryDishesList = dishes.filter(dish => dish.keyIngredients.every(keyIngredient => pantryIngredientNames.includes(keyIngredient)))
    // const pantryDishNames = pantryDishesList.map(dish => dish.name)
    return pantryDishesList
}

// const usePantryDishNames = () => {
//     // const { pantryDishes, pantryDishDispatch } = usePantryDishContext()
//     const [ pantryDishNameState, setPantryDishNameState ] = useState([])
//     const { dishes } = useDishesContext()
//     const allDishes = useDishes()
//     const pantryIngredients = usePantryIngredients()
//     const pantryIngredientNames = pantryIngredients.map(ingredient => ingredient.name)
//     const pantryDishesList = dishes.filter(dish => dish.keyIngredients.every(keyIngredient => pantryIngredientNames.includes(keyIngredient)))
//     const pantryDishNames = pantryDishesList.map(dish => dish.name)
//     const isCurrent = useRef(true)

//     // React.useEffect(() => {
//     //     return () => {
//     //         isCurrent.current = false
//     //     }
//     // }, [])

//     // React.useMemo(() => {
//     //     const updateState = () => {
//     //         console.log(pantryDishNames)
//     //         setPantryDishNameState(pantryDishNames)
//     //     }

//     //     if (isCurrent.current) {
//     //         updateState()
//     //     }
//     // }, [])

//     // // console.log(pantryDishNames)
//     // console.log(pantryDishNameState)
//     return pantryDishNames
// }

// export default usePantryDishNames