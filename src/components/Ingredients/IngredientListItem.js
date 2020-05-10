import React, { useContext, useState, useEffect } from 'react'
import FirebaseContext from '../../../context/firebase-context'
import IngredientsContext from '../../../context/ingredients-context'
import PantryContext from '../../../context/pantry-context'
import database, { firebase } from '../../firebase/firebase'

const IngredientListItem = ({ ingredient } ) => {
  const { user } = useContext(FirebaseContext)
  const { dispatch } = useContext(IngredientsContext)
  const { pantryIngredients, pantryDispatch } = useContext(PantryContext)

  const pathname = window.location.pathname

  const removeIngredient = () => {
    database.collection('ingredients').doc(ingredient.id).delete().then(() => {
      dispatch({ type: 'REMOVE_INGREDIENT', id: ingredient.id })
    })
  }

  const addPantryIngredient = () => {
    const uid = user.uid

    database.collection('users').doc(uid).collection('pantry').add(ingredient).then(() => {
      pantryDispatch(({ type: 'ADD_PANTRY_INGREDIENT', pantryIngredient: {...ingredient} }))
    })
  }

  const removePantryIngredient = () => {
    const uid = user.uid

    database.collection('users').doc(uid).collection('pantry').doc(ingredient.id).delete().then(() => {
      dispatch({ type: 'REMOVE_PANTRY_INGREDIENT', id: ingredient.id })
    })
  }

  return (
    <div className='list-item' >

      <h3>{ingredient.name}</h3>
      <p>{ingredient.category}</p>
      <p>{ingredient.price}</p>
      {pathname === '/pantry' ?
        <div>
          {ingredient.isPantry &&
            <span>P</span>
          }
          <button onClick={addPantryIngredient}>
            Add to Pantry
          </button> 
          <button onClick={removePantryIngredient}>
            Remove from Pantry
          </button>
        </div>
        :
        <button onClick={removeIngredient}>Remove</button>}
    </div>
  )
}

export { IngredientListItem as default }