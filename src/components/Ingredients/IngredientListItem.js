import React, { useContext, useState, useEffect } from 'react';
import IngredientsContext from '../../../context/ingredients-context'

const IngredientListItem = ({ ingredient }) => {
  const { dispatch } = useContext(IngredientsContext) 

  return (
    <div>
      <h3>{ingredient.name}</h3>
      <p>{ingredient.category}</p>
      <p>{ingredient.price}</p>
    </div>
  )
}

export { IngredientListItem as default }