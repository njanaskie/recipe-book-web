import React, { useReducer } from 'react'
import DishForm from './DishForm'
import IngredientsContext from '../../../context/ingredients-context'
import ingredientsReducer from '../../reducers/ingredients'
import DishesContext from '../../../context/dishes-context'
import dishesReducer from '../../reducers/dishes'
import FiltersContext from '../../../context/filters-context'
import filtersReducer from '../../reducers/filters'
import EditDishHome from './EditDishHome'

const EditDishPage = () => {
    const [ingredients, dispatch] = useReducer(ingredientsReducer, [])
    const [dishes, dishDispatch] = useReducer(dishesReducer, [])
    const [filters, filtersDispatch] = useReducer(filtersReducer, [])

    return (
        <FiltersContext.Provider value={{ filters, filtersDispatch }}>
            <DishesContext.Provider value={{ dishes, dishDispatch }} >
                <IngredientsContext.Provider value={{ ingredients, dispatch }}>
                    <h1>Edit Dish</h1>
                    <EditDishHome />
                </IngredientsContext.Provider>
            </DishesContext.Provider>
        </FiltersContext.Provider>
    )
}

export default EditDishPage