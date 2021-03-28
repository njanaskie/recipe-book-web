import React, { useState, useRef } from 'react'
import database from '../firebase/firebase'
import { useFirebaseContext } from '../context/firebase-context'
import { useRecipesContext } from '../context/recipes-context'
import { getRecipesService } from '../services/recipeServices'

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
        // const fetchData = () =>
        //     database.collection('users').doc(user.uid).collection('recipes')
        //     .orderBy('createdAt', 'desc')
        //     .get()
        //     .then((snapshot) => {
        //         if (isCurrent.current) {
        //             var docCount = snapshot.docs.length

        //             const recipes = snapshot.docs.map((doc) => ({
        //                 id: doc.id,
        //                 ...doc.data()
        //                 }))

        //             recipeDispatch({ type: 'SET_RECIPES', recipes})
        //             setCount(docCount)

        //         }
        //     }, (e) => {
        //         console.log('Error with array. ', e)
        //     });

        // if (user) {
        //     fetchData()
        // }
        const fetchRecipes = async () => {
            if (isCurrent.current) {
                const fetchedRecipes = await getRecipesService()
                recipeDispatch({ type: 'SET_RECIPES', recipes: fetchedRecipes})
            }
        }
        
        if (user) {
            fetchRecipes()
        }

    }, [user])

    return { recipes, count }
}

export default useAllRecipes