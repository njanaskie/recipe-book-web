import React, { useReducer } from 'react'
import dishesReducer from '../../../reducers/dishes'
import DishesContext from '../../../../context/dishes-context'
import FiltersContext from '../../../../context/filters-context'
import filtersReducer from '../../../reducers/filters'
import DetailHome from './DetailHome'

const DishDetailPage = () => {
    const [dishes, dishDispatch] = useReducer(dishesReducer, [])

    return (
        <DishesContext.Provider value={{ dishes, dishDispatch }}>
            <h1>Dishes Details</h1>
            <DetailHome />
        </DishesContext.Provider>
    )

};

export default DishDetailPage;