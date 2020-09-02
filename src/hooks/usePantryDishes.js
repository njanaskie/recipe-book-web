import React, { useState, useEffect, useRef } from 'react'
import { useDishesContext } from '../../context/dishes-context'
import { useFirebaseContext } from '../../context/firebase-context'
import { usePantryDishContext } from '../../context/pantry-dish-context'
import PantryContext from '../../context/pantry-context'
import useDishes from '../hooks/useDishes'
import usePantryIngredients from './usePantryIngredients'
import useFilteredDishes from '../hooks/useFilteredDishes'
import database from '../firebase/firebase'

const usePantryDishes = () => {
    // const filteredDishes = useFilteredDishes()
    const { dishes } = useDishesContext()
    const pantryIngredients = usePantryIngredients()
    const pantryIngredientNames = pantryIngredients.map(ingredient => ingredient.name)
    const allDishes = useDishes()
    const pantryDishesList = dishes.filter(dish => dish.keyIngredients.every(keyIngredient => pantryIngredientNames.includes(keyIngredient)))
    const pantryDishNames = pantryDishesList.map(dish => dish.name.toString())
    const isCurrent = useRef(true)
    const { user } = useFirebaseContext()
    const { pantryDishes, pantryDishDispatch } = usePantryDishContext()

    console.log(pantryIngredients)
    console.log(dishes)
    console.log(allDishes)
    console.log(pantryDishesList)
    console.log(pantryDishes)
    console.log(pantryDishNames)

    const test = ['Bread and Butter', 'Cheese Bread', 'Grilled Cheese', 'Ham and Cheese Sandwich']
    console.log(test)

    React.useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    React.useEffect(() => {

        // pantryDishes.map(dish => {
        //   database.collection('users').doc(user.uid).collection('dishes').add(dish).then(() => {
        //     dishDispatch({ type: 'ADD_DISH', dish })
        //   })
        // })
        const fetchPantryDishes = async () => {
            await database.collection('dishes')
            // .orderBy('name')
            // .where('name', 'in', test)
            .where('name', 'in', [pantryDishNames])
            // .where('name', 'in', ['Bread and Butter', 'Cheese Bread', 'Grilled Cheese', 'Ham and Cheese Sandwich'])
            .get()
            .then((snapshot) => {
                if (isCurrent.current) {
                    const pantryDishes = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                        }))
                    snapshot.forEach((doc) => {
                        console.log(doc.id, '->', doc.data())
                    })
        
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