import React from 'react'
import { Link } from 'react-router-dom';

const DishListItem = ({ dish }) => {
    const pathname = window.location.pathname

    return (
        <div>
            {pathname === '/dishes' ?
                <Link to={`/dish/${dish.id}`}> 
                    {dish.name}
                </Link>
            :
                <div>
                    <p>{dish.name}</p>
                </div>
            }
        </div>
    )
}

export default DishListItem