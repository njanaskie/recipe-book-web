import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDishesContext } from '../../context/dishes-context'
import { useFirebaseContext } from '../../context/firebase-context'
import { useRecipesContext } from '../../context/recipes-context'
import PantryContext, { usePantryContext } from '../../context/pantry-context'
import useDishes from '../hooks/useDishes'
import usePantryIngredients from './usePantryIngredients'
import useFilteredDishes from './useFilteredRecipes'
import database, { firebase } from '../firebase/firebase'
import testDishes from '../tests/fixtures/dishes'
import pantryDishNamesTest from '../selectors/pantry-dishes'
import { set } from 'lodash'

const useRecipes = () => {
    const { recipes, recipeDispatch } = useRecipesContext()
    const { user } = useFirebaseContext()
    const isCurrent = useRef(true)

    React.useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    React.useEffect(() => {
        const fetchRecipes = () => {
            database.collection('users').doc(user.uid).collection('recipes')
            // .orderBy('name')
            // .limitToLast(5)
            .get()
            .then((snapshot) => {
                if (isCurrent.current) {
                    const recipes = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                        }))
    
                    recipeDispatch({ type: 'SET_RECIPES', recipes})
                }
            });
        }

        fetchRecipes()
    }, [])

    return recipes
}

export default useRecipes