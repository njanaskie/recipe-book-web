import React, { useContext } from 'react'
import DishesContext from '../../../context/dishes-context'
import DishListItem from '../Dishes/DishListItem'
import useDishes from '../../hooks/useDishes'
import usePantryDishes from '../../hooks/usePantryDishes'

const DashboardList = () => {
    const pantryDishes = usePantryDishes()
    
    return (
        <div>
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