import React, { useContext, useState, useEffect } from 'react'
import IngredientsContext from '../../../context/ingredients-context'
import database from '../../firebase/firebase'

const IngredientListItem = ({ ingredient }) => {
  const { dispatch } = useContext(IngredientsContext) 

  const removeIngredient = () => {
    database.collection('ingredients').doc(ingredient.id).delete().then(() => {
      dispatch({ type: 'REMOVE_INGREDIENT', id: ingredient.id })
    })
  }

  return (
    <div className='list-item' >
      <h3>{ingredient.name}</h3>
      <p>{ingredient.category}</p>
      <p>{ingredient.price}</p>
      <button onClick={removeIngredient}>Remove</button>
    </div>
  )
}

export { IngredientListItem as default }