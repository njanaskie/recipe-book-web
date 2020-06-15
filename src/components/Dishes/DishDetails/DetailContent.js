import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import FirebaseContext from '../../../../context/firebase-context'

const DetailContent = (dish) => {
    const { isAdmin } = useContext(FirebaseContext)

    return (
        <div>
            <p>{dish.name}</p>
            <p>{dish.description}</p>
            <p>{dish.cuisine}</p>
            <p>{dish.type}</p>
            <h4>Key Ingredients</h4>
            {dish.keyIngredients && dish.keyIngredients.map(keyIngredient => <li key={keyIngredient}>{keyIngredient}</li>)}
            <h4>Optional Ingredients</h4>
            {dish.optionalIngredients && dish.optionalIngredients.map(optionalIngredient => <li key={optionalIngredient}>{optionalIngredient}</li>)}
            <h3>Recipes</h3>
            {dish.recipes && dish.recipes.map(recipe => <p key={recipe}><a href={recipe} target="_blank" rel="noopener noreferrer">{recipe}</a></p>)}
            {isAdmin && <Link to={`/edit/dish/${dish.id}`}>Edit Dish</Link>}
        </div>
    )

}

export default DetailContent