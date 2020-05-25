import React from 'react'
import { Link } from 'react-router-dom';

const DishListItem = ({ dish }) => {
    const pathname = window.location.pathname

    return (
        <div>
            <Link to={`/dish/${dish.id}`}> 
                {dish.name}
            </Link>
        </div>
    )
}

export default DishListItem