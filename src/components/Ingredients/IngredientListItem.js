import React, { useContext, useState, useEffect } from 'react'
import FirebaseContext from '../../../context/firebase-context'
import IngredientsContext from '../../../context/ingredients-context'
import PantryContext from '../../../context/pantry-context'
import database, { firebase } from '../../firebase/firebase'

const IngredientListItem = ({ ingredient } ) => {
  const { user } = useContext(FirebaseContext)
  const { dispatch } = useContext(IngredientsContext)
  const { pantryDispatch } = useContext(PantryContext)
  // const [pantryName, setPantryName] = useState('')
  // const [pantryCategory, setPantryCategory] = useState('')
  // const [pantryPrice, setPantryPrice] = useState('')

  const pathname = window.location.pathname

  // console.log(pantryName)
  // console.log(pantryCategory)
  // console.log(pantryPrice)

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

    // setPantryName(ingredient.name)
    // setPantryCategory(ingredient.category)
    // setPantryPrice(ingredient.price)
  }

  const removePantryIngredient = () => {
    const uid = user.uid

    database.collection('users').doc(uid).collection('pantry').doc(pantryIngredient.id).delete().then(() => {
      dispatch({ type: 'REMOVE_PANTRY_INGREDIENT', id: pantryIngredient.id })
    })
  }

  return (
    <div className='list-item' >
      {/* {pantryIngredient.id === ingredient.id ?
        <span>P</span>
      :
        null
      } */}
      <h3>{ingredient.name}</h3>
      <p>{ingredient.category}</p>
      <p>{ingredient.price}</p>
      {pathname === '/pantry' ?
        <div>
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