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

const useRecipes = (props) => {
    // const [nextPage, setNextPage] = useState(props.activePage)
    const [lastVisible, setLastVisible] = useState()
    const [firstVisible, setFirstVisible] = useState()
    const [count, setCount] = useState()
    const { recipes, recipeDispatch } = useRecipesContext()
    const { filters } = useFiltersContext()
    const { user } = useFirebaseContext()
    const isCurrent = useRef(true)
    const pathname = window.location.pathname

    // console.log(lastVisible)

    // Last Visible.
    // const lastVisible = recipes && recipes.docs[recipes.docs.length - 1]

    // console.log(filters)
    // console.log(props)

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
                }
                if (filters.cuisine) {
                    query = query.where('cuisine', '==', filters.cuisine)
                }
                if (filters.recipeType) {
                    query = query.where('type', '==', filters.recipeType)
                }
            }

            var queryLimited = query.orderBy('createdAt', 'asc')
            if (lastVisible) {
                if (props.isNextPage === true && props.isPreviousPage === false) {
                    queryLimited = queryLimited.startAfter(lastVisible).limit(2)
                } else if (props.isPreviousPage === true && props.isNextPage === false) {
                    queryLimited = queryLimited.endBefore(firstVisible).limitToLast(2)
                } else {
                    console.log('next/previous page did not work')
                }
            } else {
                queryLimited = queryLimited.limit(2)
            }

            return queryLimited
                .get()
                .then((snapshot) => {
                    if (isCurrent.current) {
                        var lastVisible = snapshot.docs[snapshot.docs.length-1];
                        var firstVisible = snapshot.docs[0];
                        var docCount = snapshot.docs.length
                        
                        // var next = query.orderBy('createdAt', 'asc').startAfter(lastVisible).limit(2)
        
                        const recipes = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                            }))
                            
                        recipeDispatch({ type: 'SET_RECIPES', recipes})
                        setLastVisible(lastVisible)
                        setFirstVisible(firstVisible)
                        setCount(docCount)

                    }
                    
                });
        }

        fetchRecipes()
    }, [filters, props])

    // fetchNextRecipes = () => {

    // }

    return { recipes, count }
}

export default useRecipes