import React from 'react'

const DetailContent = (dish) => (
    <div>
        <p>{dish.name}</p>
        <p>{dish.cuisine}</p>
        {dish.keyIngredients && dish.keyIngredients.map(keyIngredient => <p key={keyIngredient}>{keyIngredient}</p>)}
    </div>
)

export default DetailContent