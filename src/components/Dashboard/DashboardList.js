import React, { useContext, useState } from 'react'
import DishesContext from '../../../context/dishes-context'
import DishListItem from '../Dishes/DishListItem'
import useDishes from '../../hooks/useDishes'
import usePantryDishes from '../../hooks/usePantryDishes'
import { Input } from 'semantic-ui-react'
import DashboardListFilters from './DashboardListFilters'

const DashboardList = () => {
    const pantryDishes = usePantryDishes()
    
    return (
        <div>
            <DashboardListFilters dishes={pantryDishes}/>
            {
                pantryDishes.length === 0 ? (
                    <div>
                        <span>No dishes</span>
                    </div>
                ) : (
                    pantryDishes.map((dish) => 
                        <DishListItem key={dish.id} dish={dish} />
                    )
                )
            }
        </div>
    )
}

export default DashboardList