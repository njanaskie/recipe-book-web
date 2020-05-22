import React from 'react'
import { Link } from 'react-router-dom';

const DetailContent = (dish) => (
    <div>
        <p>{dish.name}</p>
        <p>{dish.description}</p>
        <p>{dish.cuisine}</p>
        <p>{dish.type}</p>
        <h4>Key Ingredients</h4>
        {dish.keyIngredients && dish.keyIngredients.map(keyIngredient => <li key={keyIngredient}>{keyIngredient}</li>)}
        <h4>Optional Ingredients</h4>
        {dish.optionalIngredients && dish.optionalIngredients.map(optionalIngredient => <li key={optionalIngredient}>{optionalIngredient}</li>)}
        <Link to={`/edit/dish/${dish.id}`}>Edit Dish</Link>
    </div>
)

export default DetailContent