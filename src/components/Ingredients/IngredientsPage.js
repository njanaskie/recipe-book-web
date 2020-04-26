import React, { useReducer } from 'react'
import AddIngredientForm from './AddIngredientForm'
import IngredientsList from './IngredientsList'
import ingredientsReducer from '../../reducers/ingredients'
import IngredientsContext from '../../../context/ingredients-context'

const IngredientsPage = () => {
    const [ingredients, dispatch] = useReducer(ingredientsReducer, [])

    return (
        <IngredientsContext.Provider value={{ ingredients, dispatch }}>
            <h3>Ingredients Page</h3>
            <AddIngredientForm />
            <IngredientsList />
        </IngredientsContext.Provider>
    )

};

export default IngredientsPage;