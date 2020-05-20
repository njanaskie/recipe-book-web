import React from 'react'

const DetailContent = (dish) => (
    <div>
        <p>{dish.name}</p>
        <p>{dish.cuisine}</p>
    </div>
)

export default DetailContent