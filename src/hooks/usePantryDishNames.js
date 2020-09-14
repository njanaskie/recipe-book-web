import React, { useState, useEffect, useRef } from 'react'
import { useDishesContext } from '../../context/dishes-context'
import { useFirebaseContext } from '../../context/firebase-context'
import { usePantryDishContext } from '../../context/pantry-dish-context'
import PantryContext from '../../context/pantry-context'
import useDishes from '../hooks/useDishes'
import usePantryIngredients from './usePantryIngredients'
import useFilteredDishes from '../hooks/useFilteredDishes'
import database, { firebase } from '../firebase/firebase'
import testDishes from '../tests/fixtures/dishes'

const usePantryDishNames = () => {
    // const { pantryDishes, pantryDishDispatch } = usePantryDishContext()
    const { dishes } = useDishesContext()
    const allDishes = useDishes()
    const pantryIngredients = usePantryIngredients()
    const pantryIngredientNames = pantryIngredients.map(ingredient => ingredient.name)
    const pantryDishesList = allDishes.filter(dish => dish.keyIngredients.every(keyIngredient => pantryIngredientNames.includes(keyIngredient)))
    const pantryDishNames = pantryDishesList.map(dish => dish.name)
    const isCurrent = useRef(true)

    // React.useEffect(() => {
    //     return () => pantryDishNames
    // }, [])

    console.log(allDishes)
    console.log(pantryDishNames)
    return pantryDishNames
}

export default usePantryDishNames