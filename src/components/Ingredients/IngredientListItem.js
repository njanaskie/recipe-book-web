import React, { useContext, useState, useEffect } from 'react'
import IngredientsContext from '../../../context/ingredients-context'
import database from '../../firebase/firebase'

const IngredientListItem = ({ ingredient }) => {
  const { dispatch } = useContext(IngredientsContext) 

  const removeIngredient = () => {

    database.ref(`ingredients/${ingredient.id}`).remove().then(() => {
      dispatch({ type: 'REMOVE_INGREDIENT', ingredient: ingredient.id })
    })
  }

  return (
    <div className='list-item'>
      <h3>{ingredient.name}</h3>
      <p>{ingredient.category}</p>
      <p>{ingredient.price}</p>
      <button onClick={removeIngredient}>Remove</button>
    </div>
  )
}

export { IngredientListItem as default }