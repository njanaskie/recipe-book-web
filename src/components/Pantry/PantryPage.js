import React, { useReducer, useEffect } from 'react';
import IngredientsList from '../Ingredients/IngredientsList'
import IngredientsContext from '../../../context/ingredients-context'
import ingredientsReducer from '../../reducers/ingredients'
import PantryContext from '../../../context/pantry-context'
import pantryReducer from '../../reducers/pantry'

const PantryPage = () => {
    const [ingredients, dispatch] = useReducer(ingredientsReducer, [])
    const [pantryIngredients, pantryDispatch] = useReducer(pantryReducer, [])

    return (
        <PantryContext.Provider value={{ pantryIngredients, pantryDispatch }}>
            <IngredientsContext.Provider value={{ ingredients, dispatch }}>
                <h3>Pantry page content</h3>
                <IngredientsList />
            </IngredientsContext.Provider>
        </PantryContext.Provider>

    )
};

export default PantryPage;