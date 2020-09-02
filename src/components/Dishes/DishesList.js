import React, { useContext } from 'react'
import DishesContext from '../../../context/dishes-context'
import DishListItem from './DishListItem'
import useDishes from '../../hooks/useDishes'

export const DishesList = (props) => {
    const dishes = useDishes()

    if (!dishes || !dishes.length) {
        return <div><span>No Dishes</span></div>
    }

    const tableItems = dishes && dishes.map((dish) => {
        return (
            <DishListItem key={dish.id} dish={dish} />
        )
    }
)
    
    return (
            <div className="content-container">
                <div className='dish-table'>
                    {tableItems}
                </div>
            </div>

    )
}

export default DishesList