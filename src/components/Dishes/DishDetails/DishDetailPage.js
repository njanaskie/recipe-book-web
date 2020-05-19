import React, { useReducer } from 'react'
import dishesReducer from '../../../reducers/dishes'
import DishesContext from '../../../../context/dishes-context'
import DetailView from '../DishDetails/DetailView'

const DishDetailPage = () => {
    const [dishes, dishDispatch] = useReducer(dishesReducer, [])

    return (
        <DishesContext.Provider value={{ dishes, dishDispatch }}>
            <h3>Dishes Details</h3>
            <DetailView />
        </DishesContext.Provider>
    )

};

export default DishDetailPage;