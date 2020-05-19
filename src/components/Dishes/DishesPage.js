import React, { useReducer } from 'react'
import dishesReducer from '../../reducers/dishes'
import DishesContext from '../../../context/dishes-context'
import DishesList from '../Dishes/DishesList'

const DishesPage = () => {
    const [dishes, dishDispatch] = useReducer(dishesReducer, [])

    console.log(dishes)

    return (
        <DishesContext.Provider value={{ dishes, dishDispatch }}>
            <h3>Dishes Page</h3>
            <DishesList />
        </DishesContext.Provider>
    )

};

export default DishesPage;