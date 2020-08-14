import React from 'react'
import { Link } from 'react-router-dom';
import { Image } from "semantic-ui-react";

const DishListItem = ({ dish }) => {
    const pathname = window.location.pathname

    return (
        <Link to={`/dish/${dish.id}`}>
            <div className='dish-preview'>
                <div className='image-container'>
                    <Image size='medium' rounded src="/images/image-placeholder.png" />
                    <div className='dish-label'>
                        <span>{dish.name}</span>
                    </div>
                </div>
            </div>
        </Link>



    )
}

export default DishListItem