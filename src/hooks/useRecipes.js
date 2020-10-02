import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useFiltersContext } from '../../context/filters-context'
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
    const { filters } = useFiltersContext()
    const { user } = useFirebaseContext()
    const isCurrent = useRef(true)
    const pathname = window.location.pathname

    // console.log(filters)
    // console.log(recipes)

    React.useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    React.useEffect(() => {
        const fetchRecipes = () => {
            var query = database.collection('users').doc(user.uid).collection('recipes')
            if (filters && pathname === '/home') {
                if (filters.ingredients.length > 0) {
                    query = query.where('ingredients', 'in', [filters.ingredients])
                    console.log(filters.ingredients)
                }
                if (filters.cuisine) {
                    query = query.where('cuisine', '==', filters.cuisine)
                    console.log(filters.cuisine)
                }
                if (filters.recipeType) {
                    query = query.where('type', '==', filters.recipeType)
                    console.log(filters.recipeType)
                }
            }

            const results = query.get()
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
    }, [filters])

    return recipes
}

export default useRecipes