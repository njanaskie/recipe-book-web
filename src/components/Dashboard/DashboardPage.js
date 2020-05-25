import React, { useReducer } from 'react'
import dishesReducer from '../../reducers/dishes'
import DishesContext from '../../../context/dishes-context'
import PantryContext from '../../../context/pantry-context'
import pantryReducer from '../../reducers/pantry'
import DashboardList from '../Dashboard/DashboardList'

const DashboardPage = () => {
    const [dishes, dishDispatch] = useReducer(dishesReducer, [])
    const [pantryIngredients, pantryDispatch] = useReducer(pantryReducer, [])

    return (
        <DishesContext.Provider value={{ dishes, dishDispatch }}>
            <PantryContext.Provider value={{ pantryIngredients, pantryDispatch }}>
                <h3>Dashboard Page</h3>
                <DashboardList />
            </PantryContext.Provider>
        </DishesContext.Provider>
    )

};

export default DashboardPage;