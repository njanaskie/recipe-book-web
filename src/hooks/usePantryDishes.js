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
import usePantryDishNames from '../hooks/usePantryDishNames'

const usePantryDishes = () => {
    const { pantryDishes, pantryDishDispatch } = usePantryDishContext()
    // // const filteredDishes = useFilteredDishes()
    // const { dishes } = useDishesContext()
    // const pantryIngredients = usePantryIngredients()
    // const pantryIngredientNames = pantryIngredients.map(ingredient => ingredient.name)
    // const allDishes = useDishes()
    // const pantryDishesList = dishes.filter(dish => dish.keyIngredients.every(keyIngredient => pantryIngredientNames.includes(keyIngredient)))
    // const pantryDishNames = []
    // pantryDishesList.map(dish => pantryDishNames.push(dish.name))
    // const pantryDishIds = pantryDishesList.map(dish => dish.id)
    const isCurrent = useRef(true)
    // const { user } = useFirebaseContext()

    // console.log(pantryIngredients)
    // console.log(dishes)
    // console.log(allDishes)
    // console.log(pantryDishesList)
    // console.log(pantryDishes)
    // console.log(pantryDishNames)
    // console.log(pantryDishIds)
    // // console.log(array)

    // const test = ['Bread and Butter', 'Cheese Bread', 'Grilled Cheese', 'Ham and Cheese Sandwich']
    // console.log(test)
    const pantryDishNames = usePantryDishNames()
    console.log(pantryDishNames)

    React.useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    React.useEffect(() => {
        const fetchPantryDishes = async () => {
            var query = database.collection('dishes')
            if (pantryDishNames) {
                query = query.where('name', 'in', [pantryDishNames])
                // query = query.where('name', 'in', ['Bread and Butter', 'Cheese Bread', 'Grilled Cheese', 'Ham and Cheese Sandwich'])
                console.log('pantrydishnames exists')
            }
        
            const results = await query.get()
            .then((snapshot) => {
                if (isCurrent.current) {
                    const pantryDishes = snapshot.docs.map((doc) => (
                        {
                        id: doc.id,
                        ...doc.data()
                        }
                        ))
                    // snapshot.forEach((doc) => {
                    //     console.log(doc.id, '->', doc.data())
                    // })
                    console.log(pantryDishes)
        
                    pantryDishDispatch({ type: 'SET_PANTRY_DISHES', pantryDishes })
                }
            })
            .catch(error => console.log(error));
        }

        fetchPantryDishes()
    }, [])

    return pantryDishes
}

export default usePantryDishes