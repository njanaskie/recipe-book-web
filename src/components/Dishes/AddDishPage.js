import React, { useReducer } from 'react'
import DishForm from './DishForm'
import IngredientsContext from '../../../context/ingredients-context'
import ingredientsReducer from '../../reducers/ingredients'

const AddDishPage = () => {
    const [ingredients, dispatch] = useReducer(ingredientsReducer, [])

    return (
        <IngredientsContext.Provider value={{ ingredients, dispatch }}>
            <h1>Add Dish</h1>
            <DishForm />
        </IngredientsContext.Provider>
    )
}

export default AddDishPage