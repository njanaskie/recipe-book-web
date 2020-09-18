import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDishesContext } from '../../context/dishes-context'
import { useFirebaseContext } from '../../context/firebase-context'
import { usePantryDishContext } from '../../context/pantry-dish-context'
import PantryContext from '../../context/pantry-context'
import useDishes from '../hooks/useDishes'
import usePantryIngredients from './usePantryIngredients'
import useFilteredDishes from '../hooks/useFilteredDishes'
import database, { firebase } from '../firebase/firebase'
import testDishes from '../tests/fixtures/dishes'
import pantryDishNamesTest from '../selectors/pantry-dishes'
import { set } from 'lodash'

const useExistingPantryDishes = () => {
    const [ existingPantryDishes, setExistingPantryDishes] = useState([])
    const { user } = useFirebaseContext()
    const isCurrent = useRef(true)

    React.useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    React.useEffect(() => {
        const fetchPantryDishes = () => {
            database.collection('users').doc(user.uid).collection('dishes')
            .orderBy('name')
            // .limitToLast(5)
            .get()
            .then((snapshot) => {
                if (isCurrent.current) {
                    const pantryDishes = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                        }))
    
                    setExistingPantryDishes(pantryDishes)
                }
            });
        }

        fetchPantryDishes()
    }, [])

    return existingPantryDishes
}

export default useExistingPantryDishes