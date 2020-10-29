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
import { config } from '../../config'

const useRecipes = (props) => {
    // const [nextPage, setNextPage] = useState(props.activePage)
    const [lastVisible, setLastVisible] = useState()
    const [firstVisible, setFirstVisible] = useState()
    const [count, setCount] = useState()
    const [nextHidden, setNextHidden] = useState()
    const { recipes, recipeDispatch } = useRecipesContext()
    const { filters } = useFiltersContext()
    const { user } = useFirebaseContext()
    const isCurrent = useRef(true)
    const pathname = window.location.pathname
    const lastVisibleId = lastVisible && lastVisible.id
    const nextHiddenId = nextHidden && nextHidden.id
    // const [alert, setAlert] = useState(false)

    // if (firstVisible && lastVisible && nextHidden) {
    //     console.log(firstVisible.id)
    //     console.log(lastVisible.id)
    //     console.log(nextHidden.id)
    // }

    // console.log(nextHiddenId)

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
                    queryLimited = queryLimited.startAfter(lastVisible).limit(config.itemsFetched)
                } else if (props.isPreviousPage === true && props.isNextPage === false) {
                    queryLimited = queryLimited.endBefore(firstVisible).limitToLast(config.itemsPerPage)
                } else {
                    queryLimited = queryLimited.limit(config.itemsFetched)
                }
            } else {
                queryLimited = queryLimited.limit(config.itemsFetched)
            } 

            return queryLimited
                .get()
                .then((snapshot) => {
                    if (isCurrent.current) {
                        var docCount = snapshot.docs.length
                        var subtractor = docCount < config.itemsFetched ? (config.itemsFetched-2) : (config.itemsFetched-1)
                        var lastVisible = snapshot.docs[snapshot.docs.length-subtractor];
                        var firstVisible = snapshot.docs[0];
                        var nextHidden = snapshot.docs[snapshot.docs.length-(subtractor-1)];
                        
                        // var next = query.orderBy('createdAt', 'asc').startAfter(lastVisible).limit(2)
        
                        const recipes = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                            }))
                            
                        recipeDispatch({ type: 'SET_RECIPES', recipes})
                        setLastVisible(lastVisible)
                        setFirstVisible(firstVisible)
                        setCount(docCount)
                        setNextHidden(nextHidden)
                        // if (docCount === 0) {
                        //     setAlert(true)
                        // }

                    }
                    
                });
        }

        fetchRecipes()
    }, [filters, props])

    // fetchNextRecipes = () => {

    // }

    return { recipes, lastVisibleId, nextHiddenId, count }
}

export default useRecipes