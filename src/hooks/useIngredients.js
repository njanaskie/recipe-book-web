import React, { useContext, useEffect, useRef } from 'react'
import database from '../firebase/firebase'
import { useIngredientsContext } from '../../context/ingredients-context'

const useIngredients = () => {
    const { ingredients, dispatch } = useIngredientsContext()
    const isCurrent = useRef(true)

    React.useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    React.useEffect(() => {
        const unsubscribe = database.collection('ingredients').orderBy("category", "asc")
        .onSnapshot((snapshot) => {
            if (isCurrent.current) {
                const ingredients = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                localStorage.setItem('myValueInLocalStorageIngs', JSON.stringify(ingredients));
                dispatch({ type: 'SET_INGREDIENTS', ingredients})
            }
        }, (e) => {
            console.log('Error with array. ', e)
        });


        const cachedHits = JSON.parse(localStorage.getItem('myValueInLocalStorageIngs'))

        return () => {
            if (cachedHits) {
                console.log('ings cached hits')
                dispatch({ type: 'SET_INGREDIENTS', ingredients: cachedHits})
            } else {
                console.log('ings api hits')
                unsubscribe()
            }
        }
        
    }, [])

    return ingredients.sort((a,b) => a.name.localeCompare(b.name))
}

export default useIngredients