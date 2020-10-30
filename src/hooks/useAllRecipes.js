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

    console.log(recipes)

    React.useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    React.useEffect(() => {
        const fetchData = () => {
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

                    recipeDispatch({ type: 'SET_RECIPES', recipes})
                    setCount(docCount)
                }
            });
        }

        fetchData()

    }, [])

    return { recipes, count }
}

export default useAllRecipes