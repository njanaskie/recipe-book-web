import React, { useReducer } from 'react'
import AddDishHome from './AddDishHome'
import IngredientsContext from '../../../context/ingredients-context'
import ingredientsReducer from '../../reducers/ingredients'
import DishesContext from '../../../context/dishes-context'
import dishesReducer from '../../reducers/dishes'

const AddDishPage = () => {
    const [ingredients, dispatch] = useReducer(ingredientsReducer, [])
    const [dishes, dishDispatch] = useReducer(dishesReducer, [])

    return (
        <DishesContext.Provider value={{ dishes, dishDispatch }} >
            <IngredientsContext.Provider value={{ ingredients, dispatch }}>
                <AddDishHome />
            </IngredientsContext.Provider>
        </DishesContext.Provider>
    )
}

export default AddDishPage