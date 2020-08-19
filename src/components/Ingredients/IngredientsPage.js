import React, { useReducer, useEffect } from 'react'
import AddIngredientForm from './AddIngredientForm'
import IngredientsList from './IngredientsList'
import ingredientsReducer from '../../reducers/ingredients'
import IngredientsContext from '../../../context/ingredients-context'
import PantryContext from '../../../context/pantry-context'
import pantryReducer from '../../reducers/pantry'
import database from '../../firebase/firebase'

const IngredientsPage = () => {
    const [ingredients, dispatch] = useReducer(ingredientsReducer, [])
    const [pantryIngredients, pantryDispatch] = useReducer(pantryReducer, [])

    return (
        <PantryContext.Provider value={{ pantryIngredients, pantryDispatch }}>
            <IngredientsContext.Provider value={{ ingredients, dispatch }}>
                <AddIngredientForm />
                <IngredientsList />
            </IngredientsContext.Provider>
        </PantryContext.Provider>
    )

};

export default IngredientsPage;