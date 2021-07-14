import React, { useRef } from 'react'
import database from '../firebase/firebase'
import { useIngredientsContext } from '../context/ingredients-context'
import { useFirebaseContext } from '../context/firebase-context'
import { getIngredientsService } from '../services/ingredientServices'

const useIngredients = () => {
    const { ingredients, dispatch } = useIngredientsContext()
    const isCurrent = useRef(true)
    const { user } = useFirebaseContext()

    React.useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    React.useEffect(() => {
        // const unsubscribe = database.collection('ingredients').orderBy("category", "asc")
        // .onSnapshot((snapshot) => {
        //     if (isCurrent.current) {
        //         const ingredients = snapshot.docs.map((doc) => ({
        //             id: doc.id,
        //             ...doc.data()
        //         }))

        //         dispatch({ type: 'SET_INGREDIENTS', ingredients})
        //     }
        // }, (e) => {
        //     console.log('Error with array. ', e)
        // });

        // if (user) {
        //     return () => unsubscribe()
        // }

        const fetchIngredients = async () => {
            if (isCurrent.current) {
                const fetchedIngredients = await getIngredientsService()
                dispatch({ type: 'SET_INGREDIENTS', ingredients: fetchedIngredients})
            }
        }
        
        if (user) {
            fetchIngredients()
        }
        
    }, [])

    return ingredients
}

export default useIngredients