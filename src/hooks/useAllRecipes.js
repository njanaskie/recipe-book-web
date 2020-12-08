import React, { useState, useEffect, useRef } from 'react'
import useRecipes from './useRecipes'
import database, { firebase } from '../firebase/firebase'
import { useFirebaseContext } from '../../context/firebase-context'
import { useRecipesContext } from '../../context/recipes-context'

const useAllRecipes = () => {
    const [count, setCount] = useState(0)
    const { recipes, recipeDispatch } = useRecipesContext()
    const isCurrent = useRef(true)
    const { user } = useFirebaseContext()

    React.useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, []) 

    React.useEffect(() => {
        const fetchData = () =>
            database.collection('users').doc(user.uid).collection('recipes')
            .orderBy('createdAt', 'desc')
            .get()
            .then((snapshot) => {
                if (isCurrent.current) {
                    var docCount = snapshot.docs.length

                    const recipes = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                        }))

                    // localStorage.setItem('myValueInLocalStorage', JSON.stringify(recipes));
                    recipeDispatch({ type: 'SET_RECIPES', recipes})
                    setCount(docCount)
                    console.log('recipes snap')

                }
            }, (e) => {
                console.log('Error with array. ', e)
            });

        // const cachedHits = JSON.parse(localStorage.getItem('myValueInLocalStorage'))

        // return () => {
            // if (cachedHits === recipes) {
            //     recipeDispatch({ type: 'SET_RECIPES', recipes: cachedHits})
            //     console.log('cached hits')
            // } else {
            //     console.log('api hits')
            //     fetchData()
            // }
        // }

        console.log('recipe api hits')
        fetchData()

    }, [])

    return { recipes, count }
}

export default useAllRecipes