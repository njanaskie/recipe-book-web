import React, { useContext, useEffect } from 'react'
import IngredientListItem from './IngredientListItem'
import IngredientsContext from '../../../context/ingredients-context'
import database from '../../firebase/firebase'

const IngredientsList = () => {
    const { ingredients, dispatch } = useContext(IngredientsContext)

    useEffect(() => {
        database.ref('ingredients')
        .once('value')
        .then((snapshot) => {
            const ingredients = [];

            snapshot.forEach((childSnapshot) => {
                ingredients.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch({ type: 'SET_INGREDIENTS', ingredients})
            });
        }, [ingredients])

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