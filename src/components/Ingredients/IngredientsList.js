import React, { useContext, useEffect } from 'react'
import IngredientListItem from './IngredientListItem'
import IngredientsContext from '../../../context/ingredients-context'
import database from '../../firebase/firebase'

const useIngredients = () => {
    const { ingredients, dispatch } = useContext(IngredientsContext)

    useEffect(() => {
        const unsubscribe = database.collection('ingredients')
        .get()
        .then((snapshot) => {
            const ingredients = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
                }))

            dispatch({ type: 'SET_INGREDIENTS', ingredients})
            });

        return () => unsubscribe()
        
        }, [])

    return ingredients
}

const IngredientsList = () => {
    const ingredients = useIngredients()

    return (
        <div>
            {
                ingredients.length === 0 ? (
                    <div>
                        <span>No ingredients</span>
                    </div>
                ) : (
                    ingredients.map((ingredient, id) => (
                        <IngredientListItem key={id} ingredient={ingredient} />
                    ))
                )
            }
        </div>
    )
}

export { IngredientsList as default }