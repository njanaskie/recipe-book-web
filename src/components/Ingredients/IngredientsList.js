import React, { useContext, useEffect } from 'react'
import _ from 'lodash'
import IngredientListItem from './IngredientListItem'
import IngredientListHeader from './IngredientListHeader'
import IngredientsContext from '../../../context/ingredients-context'
import PantryContext from '../../../context/pantry-context'
import database from '../../firebase/firebase'

const useIngredients = () => {
    const { ingredients, dispatch } = useContext(IngredientsContext)

    useEffect(() => {
        database.collection('ingredients')
        .get()
        .then((snapshot) => {
            const ingredients = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
                }))

            dispatch({ type: 'SET_INGREDIENTS', ingredients})
            });
        
        }, [])

    return ingredients
}

const usePantryIngredients = () => {
    const { pantryIngredients, pantryDispatch } = useContext(PantryContext)

    useEffect(() => {
        pantryDispatch({ type: 'SET_PANTRY_INGREDIENTS', pantryIngredients})

        console.log(pantryIngredients)
    }, [pantryIngredients])

    return pantryIngredients
}

export const IngredientsList = () => {
    const ingredients = useIngredients()
    const pantryIngredients = usePantryIngredients()

    const groupedIngredients = _.groupBy(ingredients, 'category')

    return (
        <div>
            {
                ingredients.length === 0 ? (
                    <div>
                        <span>No ingredients</span>
                    </div>
                ) : (
                    Object.keys(groupedIngredients).map(category => {
                        return (
                            <div key={category} >
                                <IngredientListHeader category={category} />
                                {groupedIngredients[category].map((ingredient, id) => {
                                    return (
                                        <IngredientListItem key={id} ingredient={ingredient} />
                                    )
                                })}
                            </div>
  
                        )
                    })
                )
            }
        </div>
    )
}

export { IngredientsList as default }