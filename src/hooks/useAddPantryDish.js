import React, { useContext, useEffect, useRef } from 'react'
import database from '../firebase/firebase'
import { useDishesContext } from '../../context/dishes-context'
import { usePantryContext } from '../../context/pantry-context'
import { usePantryDishContext } from '../../context/pantry-dish-context'
import { useFirebaseContext } from '../../context/firebase-context'
import useExistingPantryDishes from '../hooks/useExistingPantryDishes'
import selectPantryDishes from '../selectors/pantry-dishes'

const useAddPantryDish = (ingredient) => {
    const isCurrent = useRef(true)
    const { user } = useFirebaseContext()
    const { pantryDishDispatch } = usePantryDishContext()
    const { pantryIngredients } = usePantryContext()
    const { dishes, dishDispatch } = useDishesContext()
    const existingPantryDishes = useExistingPantryDishes()
    // const dishes = useDishes()
    const selectedPantryDishes = selectPantryDishes(pantryIngredients, dishes)

    console.log(ingredient.isPantry)
    console.log(selectedPantryDishes)
    console.log(existingPantryDishes)

    React.useEffect(() => {
        // const addPantryDish = (selectedPantry, existingPantry) => {
        console.log(selectedPantryDishes)
        console.log(existingPantryDishes)
        const dishesToAdd = selectedPantryDishes.filter((dish) => !existingPantryDishes.some((existingDish) => existingDish.id === dish.id));
        console.log('dishesToAdd', dishesToAdd)
        if (dishesToAdd && ingredient.isPantry === false) {
            dishesToAdd.map(dish => {
                database.collection('users').doc(user.uid).collection('dishes').add(dish).then(() => {
                    pantryDishDispatch({ type: 'ADD_PANTRY_DISH', dish })
                    console.log('added pantry dish', dish)
                })
            })
        }
        // }
    }, [pantryIngredients])
}

export default useAddPantryDish