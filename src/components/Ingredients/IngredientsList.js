import React, { useContext, useEffect } from 'react'
import _ from 'lodash'
import IngredientListItem from './IngredientListItem'
import IngredientListHeader from './IngredientListHeader'
import IngredientsContext from '../../../context/ingredients-context'
import PantryContext from '../../../context/pantry-context'
import FirebaseContext from '../../../context/firebase-context'
import database from '../../firebase/firebase'
import useIngredients from '../../hooks/useIngredients'
import usePantryIngredients from '../../hooks/usePantryIngredients'

export const syncIngredientsWithPantry = (ings, pIngs) => {
    const syncedIngredients = []

    if (ings) {
        ings && ings.forEach((ing) => {
            let isPantry = false
            
            pIngs.forEach((pIng) => {
                if (ing.name === pIng.name) {
                    isPantry = true
                } else {
                    isPantry
                }
            })
    
            return syncedIngredients.push({ ...ing, isPantry })
        })
    }

    return syncedIngredients
}

export const IngredientsList = (props) => {
    const ingredients = useIngredients().filter(ingredient => ingredient.id !== undefined)
    const pantryIngredients = usePantryIngredients()
    const syncedIngredients = syncIngredientsWithPantry(ingredients, pantryIngredients)
    
    const groupedIngredients = _.groupBy(syncedIngredients, 'category')

    console.log(ingredients)

    return (
        <div className="content-container">
            <div>
                {
                    ingredients ? (
                        Object.keys(groupedIngredients).map(category => {
                            return (
                                <div key={category} >
                                    <IngredientListHeader category={category} />
                                    <div className='ingredient-group-list'>
                                        {groupedIngredients[category].map((ingredient, id) => {
                                            return (
                                                <IngredientListItem key={id} ingredient={ingredient} />
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div>
                            <span>No ingredients</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export { IngredientsList as default }