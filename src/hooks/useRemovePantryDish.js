import React, { useContext, useEffect, useRef } from 'react'
import database from '../firebase/firebase'
import { useDishesContext } from '../../context/dishes-context'
import { usePantryContext } from '../../context/pantry-context'
import { usePantryDishContext } from '../../context/pantry-dish-context'
import { useFirebaseContext } from '../../context/firebase-context'
import useExistingPantryDishes from '../hooks/useExistingPantryDishes'
import selectPantryDishes from '../selectors/pantry-dishes'

const useRemovePantryDish = (ingredient) => {
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
        console.log('removed', ingredient)
        console.log(selectedPantryDishes)
        console.log(existingPantryDishes)
        const dishesToRemove = existingPantryDishes.filter((existingDish) => !selectedPantryDishes.some((dish) => dish.id === existingDish.id));
        console.log('dishesToRemove', dishesToRemove)
        if (dishesToRemove && ingredient.isPantry === true) {
            dishesToRemove.map(dish => {
              database.collection('users').doc(user.uid).collection('dishes').doc(dish.id).delete().then(() => {
                  pantryDishDispatch({ type: 'REMOVE_PANTRY_DISH', id: dish.id })
                  console.log('removed pantry dish', dish)
              })
            })
        }
    }, [pantryIngredients])
}

export default useRemovePantryDish