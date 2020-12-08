import React, { useContext, useEffect } from 'react'
import _ from 'lodash'
import { List } from 'semantic-ui-react'
import IngredientListItem from './IngredientListItem'
import IngredientListHeader from './IngredientListHeader'
import IngredientsContext, { useIngredientsContext } from '../../../context/ingredients-context'
import PantryContext from '../../../context/pantry-context'
import FirebaseContext from '../../../context/firebase-context'
import database from '../../firebase/firebase'
import useIngredients from '../../hooks/useIngredients'
import usePantryIngredients from '../../hooks/usePantryIngredients'
import { useDishesContext } from '../../../context/dishes-context'
import { usePantryDishContext } from '../../../context/pantry-dish-context'
import useDishes from '../../hooks/useDishes'
import useExistingPantryDishes from '../../hooks/useExistingPantryDishes'
import selectPantryDishes from '../../selectors/pantry-dishes'
import selectIngredients from '../../selectors/ingredients'

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

// ingredients ? (
//     Object.keys(groupedIngredients).map(category => {
//         return (
//             <div key={category} >
//                 <IngredientListHeader category={category} />
//                 <div className='ingredient-group-list'>
//                     {groupedIngredients[category].map((ingredient, id) => {
//                         return (
//                                 <IngredientListItem
//                                     key={id}
//                                     ingredient={ingredient}
//                                 />
//                         )
//                     })}
//                 </div>
//             </div>
//         )
//     })

export const IngredientsList = (props) => {
    const { ingredients } = useIngredientsContext()
    // const pantryIngredients = usePantryIngredients()
    // const syncedIngredients = syncIngredientsWithPantry(ingredients, pantryIngredients)
    // const { dishDispatch } = useDishesContext()
    // const { pantryDishes, pantryDishDispatch } = usePantryDishContext()
    // const dishes = useDishes()
    // const existingPantryDishes = useExistingPantryDishes()
    // const selectedPantryDishes = selectPantryDishes(pantryIngredients, dishes)

    // console.log(pantryIngredients)
    // console.log(dishes)
    // console.log(existingPantryDishes)
    // console.log(selectedPantryDishes)
    
    // const groupedIngredients = _.groupBy(syncedIngredients, 'category')

    return (
        <div className="content-container">
            <List divided verticalAlign='middle'>
                {
                    ingredients ? (
                        ingredients.map((ingredient, id) => (
                                <IngredientListItem
                                    key={id}
                                    ingredient={ingredient}
                                />
                        ))
                    ) : (
                        <div>
                            <span>No ingredients</span>
                        </div>
                    )
                }
            </List>
        </div>
    )
}

export { IngredientsList as default }