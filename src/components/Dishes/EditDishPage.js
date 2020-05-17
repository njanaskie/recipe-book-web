import React, { useReducer } from 'react'
import DishForm from './DishForm'
import IngredientsContext from '../../../context/ingredients-context'
import ingredientsReducer from '../../reducers/ingredients'
import DishesContext from '../../../context/dishes-context'
import dishesReducer from '../../reducers/dishes'

const EditDishPage = () => {
    const [ingredients, dispatch] = useReducer(ingredientsReducer, [])
    const [dishes, dishDispatch] = useReducer(dishesReducer, [])

    return (
        <DishesContext.Provider value={{ dishes, dishDispatch }} >
            <IngredientsContext.Provider value={{ ingredients, dispatch }}>
                <h1>Edit Dish</h1>
                <DishForm
                    
                />
            </IngredientsContext.Provider>
        </DishesContext.Provider>
    )
}

export default EditDishPage