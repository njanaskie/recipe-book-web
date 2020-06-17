import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import FirebaseContext from '../../../../context/firebase-context'
import { ReactTinyLink } from 'react-tiny-link'

const DetailContent = (dish) => {
    const { isAdmin } = useContext(FirebaseContext)

    // const getDataFromURL = (dish) => {
    //     if (dish) {
    //         console.log('fetching ', dish.recipes)
    //         return dish.recipes.map(recipe =>
    //             fetch(`${recipe}`)
    //                 .then((response) => response.json())
    //                 .then((responseJson) => {
    //                 //   return responseJson.movies;
    //                     console.log(responseJson)
    //                 })
    //                 .catch((error) => {
    //                     console.error(error);
    //                 })
    //             );
    //     } else {
    //         console.log('not fetching')
    //     }
    // }

    // if (dish.id) {
    //     console.log(dish)
    //     getDataFromURL(dish)
    // }

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
            {/* {dish.recipes && dish.recipes.map(recipe => <p key={recipe}><a href={recipe} target="_blank" rel="noopener noreferrer">{recipe}</a></p>)} */}
            {dish.recipes && dish.recipes.map(recipe => <ReactTinyLink key={recipe} url={recipe}>{recipe}</ReactTinyLink>)}
            {isAdmin && <Link to={`/edit/dish/${dish.id}`}>Edit Dish</Link>}
        </div>
    )

}

export default DetailContent