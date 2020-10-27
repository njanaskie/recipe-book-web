import React, { useState, useEffect, useRef } from 'react'
import useRecipes from '../hooks/useRecipes'
import database, { firebase } from '../firebase/firebase'
import { useFirebaseContext } from '../../context/firebase-context'

const useNextRecipe = ({ recipes }) => {
    const [nextRecipe, setNextRecipe] = useState()
    const isCurrent = useRef(true)
    const { user } = useFirebaseContext()
    // const results = useRecipes()
    const lastVisible = recipes[recipes.length - 1]

    // console.log(recipes)
    // console.log(lastVisible)

    React.useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    React.useEffect(() => {
        // if (lastVisible !== undefined) {
        const fetchData = () => {
            console.log('start fetch')
            database.collection('users').doc(user.uid).collection('recipes')
            .orderBy('createdAt', 'asc')
            .startAfter(lastVisible)
            .limit(1)
            .get()
            .then((snapshot) => {
                if (isCurrent.current) {
                    const recipe = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                        }))

                    // console.log(recipe)
                    setNextRecipe(recipe)
                }
            });
        }

        if (lastVisible) {
            fetchData()
        }
        // } else {
        //     console.log('not fetching')
        // }

        // const fetchRecipes = () => {
        //     var query = database.collection('users').doc(user.uid).collection('recipes')

        //     var queryLastVisible = query.orderBy('createdAt', 'asc')
        //     console.log(lastVisible)
        //     if (lastVisible) {
        //         console.log('last visible exists')
        //         queryLastVisible = queryLastVisible.startAfter(lastVisible).limit(1)
        //     }

        //     return queryLastVisible
        //         .get()
        //         .then((snapshot) => {
        //             if (isCurrent.current) {
        //                 const recipe = snapshot.docs.map((doc) => ({
        //                     id: doc.id,
        //                     ...doc.data()
        //                     }))
                            
        //             setNextRecipe(recipe)
        //             }
        //         });
        // }

        // fetchRecipes()

    }, [recipes])

    return nextRecipe
}

export default useNextRecipe