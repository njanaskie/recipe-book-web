import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDishesContext } from '../../context/dishes-context'
import { useFirebaseContext } from '../../context/firebase-context'
import { usePantryDishContext } from '../../context/pantry-dish-context'
import PantryContext from '../../context/pantry-context'
import useDishes from '../hooks/useDishes'
import usePantryIngredients from './usePantryIngredients'
import useFilteredDishes from '../hooks/useFilteredDishes'
import useExistingPantryDishes from '../hooks/useExistingPantryDishes'
import database, { firebase } from '../firebase/firebase'
import testDishes from '../tests/fixtures/dishes'
import pantryDishNamesTest from '../selectors/pantry-dishes'
import { set } from 'lodash'

const usePantryDishes = () => {
    const { pantryDishes, pantryDishDispatch } = usePantryDishContext()
    const [ dishesToAdd, setDishesToAdd ] = useState([])
    const { user } = useFirebaseContext()
    // // const filteredDishes = useFilteredDishes()
    const allDishes = useDishes()
    // const { dishes } = useDishesContext()
    const pantryIngredients = usePantryIngredients()
    const pantryIngredientNames = pantryIngredients.map(ingredient => ingredient.name)
    const pantryDishesList = allDishes.filter(dish => dish.keyIngredients.every(keyIngredient => pantryIngredientNames.includes(keyIngredient)))
    // const pantryDishNames = pantryDishesList.map(dish => dish.name)
    // const pantryDishIds = pantryDishesList.map(dish => dish.id)
    const existingPantryDishes = useExistingPantryDishes()
    const isCurrent = useRef(true)
    // const { user } = useFirebaseContext()
    // console.log(pantryIngredients)
    // console.log(dishes)
    // console.log(allDishes)
    console.log(pantryDishesList)
    // console.log(pantryDishes)
    // console.log(pantryDishNames)
    // console.log(pantryDishIds)
    // // console.log(array)

    // const test = ['Bread and Butter', 'Cheese Bread', 'Grilled Cheese', 'Ham and Cheese Sandwich']
    // console.log(test)
    // const pantryDishNames = pantryDishNamesTest(pantryIngredients, allDishes)
    // console.log(pantryDishNames)
    // console.log(pantryDishNameState)
    console.log(existingPantryDishes)

    const determineDiff = () => {
        if (existingPantryDishes) {
            if (existingPantryDishes.length < pantryDishesList.length) {
                console.log('add pantry dish')
                const dishesToAdd = pantryDishesList.filter((dish) => !existingPantryDishes.some((existingDish) => existingDish.id === dish.id));
                console.log(dishesToAdd)
                setDishesToAdd(dishesToAdd)
            } else if (existingPantryDishes.length > pantryDishesList.length) {
                console.log('remove pantry dish')
                const dishesToRemove = existingPantryDishes.filter((existingDish) => !pantryDishesList.some((dish) => dish.id === existingDish.id));
                console.log(dishesToRemove)
            } else {
                console.log('array lengths are equal')
            }
        } else {
            console.log('no existing pantry dishes')
        }

        return dishesToAdd
    }


    React.useEffect(() => {
        console.log('useeffect 1')
        return () => {
            isCurrent.current = false
        }
    }, [])

    React.useEffect(() => {
        console.log('useeffect 2.5')

        // const result = determineDiff()
        // console.log(result)

        // if (existingPantryDishes) {
        //     if (existingPantryDishes.length < pantryDishesList.length) {
        //         console.log('add pantry dish')
        //         const dishesToAdd = pantryDishesList.filter((dish) => !existingPantryDishes.some((existingDish) => existingDish.id === dish.id));
        //         console.log(dishesToAdd)
        //         dishesToAdd.map(dish => {
        //             database.collection('users').doc(user.uid).collection('dishes').add(dish).then(() => {
        //                 pantryDishDispatch({ type: 'ADD_PANTRY_DISH', dish })
        //             })
        //         })
        //     } else if (existingPantryDishes.length > pantryDishesList.length) {
        //         console.log('remove pantry dish')
        //         const dishesToRemove = existingPantryDishes.filter((existingDish) => !pantryDishesList.some((dish) => dish.id === existingDish.id));
        //         console.log(dishesToRemove)
        //         dishesToRemove.map(dish => {
        //             database.collection('users').doc(user.uid).collection('dishes').doc(dish.id).delete().then(() => {
        //                 pantryDishDispatch({ type: 'REMOVE_PANTRY_DISH', id: dish.id })
        //             })
        //         })
        //     } else {
        //         console.log('array lengths are equal')
        //     }
        // } else {
        //     console.log('no existing pantry dishes')
        // }

    }, [])

    React.useEffect(() => {
        console.log('useeffect 3')
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

                    pantryDishDispatch({ type: 'SET_PANTRY_DISHES', pantryDishes })
                    console.log(pantryDishes)
                }
            });
        }

        fetchPantryDishes()
    }, [])

    // React.useEffect(() => {
    //     setPantryDishNameState(pantryDishNames)
    //     console.log(pantryDishNameState)
    // }, [])

    // React.useEffect(() => {
    //     const fetchPantryDishes = () => {
    //         var query = database.collection('dishes')
    //         if (pantryDishNameState) {
    //             query = query.where('name', 'in', [pantryDishNameState])
    //             // query = query.where('name', 'in', ['Bread and Butter', 'Cheese Bread', 'Grilled Cheese', 'Ham and Cheese Sandwich'])
    //             console.log('pantrydishnames exists', pantryDishNameState)
    //         }
        
    //         const results = query.get()
    //         .then((snapshot) => {
    //             if (isCurrent.current) {    
    //                 // setPantryDishNameState(pantryDishNames)
    //                 // console.log(pantryDishNameState)
    //                 const pantryDishes = snapshot.docs.map((doc) => (
    //                     {
    //                     id: doc.id,
    //                     ...doc.data()
    //                     }
    //                     ))
    //                 // snapshot.forEach((doc) => {
    //                 //     // console.log(doc.id, '->', doc.data())
    //                 //     console.log(doc.get('name'))
    //                 //     if (pantryDishNames.includes(doc.get('name')) === true) {
    //                 //         console.log(doc.id, '->', doc.data())
    //                 //     }
    //                 // })
    //                 console.log(pantryDishes)
        
    //                 pantryDishDispatch({ type: 'SET_PANTRY_DISHES', pantryDishes })
    //             }
    //         })
    //         .catch(error => console.log(error));

    //         // if (pantryDishNameState) {
    //         //     query = query.where('name', 'in', [pantryDishNameState])
    //         //     // query = query.where('name', 'in', ['Bread and Butter', 'Cheese Bread', 'Grilled Cheese', 'Ham and Cheese Sandwich'])
    //         //     console.log('pantrydishnames exists', pantryDishNameState)
    //         // }
    //     }

    //     fetchPantryDishes()
    // }, [])

    return pantryDishes
}

export default usePantryDishes