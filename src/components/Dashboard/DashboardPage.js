import React, { useReducer } from 'react'
import dishesReducer from '../../reducers/dishes'
import DishesContext from '../../../context/dishes-context'
import PantryContext from '../../../context/pantry-context'
import FiltersContext from '../../../context/filters-context'
import pantryReducer from '../../reducers/pantry'
import filtersReducer from '../../reducers/filters'
import DashboardList from '../Dashboard/DashboardList'


const DashboardPage = () => {
    const [dishes, dishDispatch] = useReducer(dishesReducer, [])
    const [pantryIngredients, pantryDispatch] = useReducer(pantryReducer, [])
    const [filters, filtersDispatch] = useReducer(filtersReducer)

    return (
        <FiltersContext.Provider value={{ filters, filtersDispatch }}>
            <DishesContext.Provider value={{ dishes, dishDispatch }}>
                <PantryContext.Provider value={{ pantryIngredients, pantryDispatch }}>
                    <DashboardList />
                </PantryContext.Provider>
            </DishesContext.Provider>
        </FiltersContext.Provider>
    )

};

export default DashboardPage;