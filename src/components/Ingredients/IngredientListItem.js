import React, { useContext, useState, useEffect } from 'react'
import { Checkbox, Button, Icon, Label } from 'semantic-ui-react'
import { useFirebaseContext } from '../../../context/firebase-context'
import { useIngredientsContext } from '../../../context/ingredients-context'
import { usePantryContext } from '../../../context/pantry-context'
import database, { firebase } from '../../firebase/firebase'
import { useDishesContext } from '../../../context/dishes-context'
import { usePantryDishContext } from '../../../context/pantry-dish-context'
import useDishes from '../../hooks/useDishes'
import useExistingPantryDishes from '../../hooks/useExistingPantryDishes'
import selectPantryDishes from '../../selectors/pantry-dishes'

const IngredientListItem = ({ ingredient } ) => {
  const [checked, setChecked] = useState(ingredient.isPantry)
  const { user } = useFirebaseContext()
  const { dispatch } = useIngredientsContext()
  const { pantryIngredients, pantryDispatch } = usePantryContext()
  const { dishDispatch } = useDishesContext()
  const { pantryDishes, pantryDishDispatch } = usePantryDishContext()
  const dishes = useDishes()
  const existingPantryDishes = useExistingPantryDishes()
  const selectedPantryDishes = selectPantryDishes(pantryIngredients, dishes)

  const pathname = window.location.pathname

  const removeIngredient = () => {
    database.collection('ingredients').doc(ingredient.id).delete().then(() => {
      dispatch({ type: 'REMOVE_INGREDIENT', id: ingredient.id })
    })
  }

  // const toggle = () => {
  //   setChecked(!checked)
  // }

  // useEffect(() => {
  const addPantryIngredient = () => {
    const uid = user.uid

    database.collection('users').doc(uid).collection('pantry').doc(ingredient.id).set(ingredient).then(() => {
      pantryDispatch(({ type: 'ADD_PANTRY_INGREDIENT', pantryIngredient: {...ingredient} }))
    })
  }

  const addPantryDish = () => {
    console.log('added', ingredient)
    const dishesToAdd = selectedPantryDishes.filter((dish) => !existingPantryDishes.some((existingDish) => existingDish.id === dish.id));
    console.log('dishesToAdd', dishesToAdd)
    dishesToAdd.map(dish => {
      database.collection('users').doc(user.uid).collection('dishes').add(dish).then(() => {
          pantryDishDispatch({ type: 'ADD_PANTRY_DISH', dish })
      })
    })
  }

  const removePantryIngredient = () => {
    const uid = user.uid

    database.collection('users').doc(uid).collection('pantry').doc(ingredient.id).delete().then(() => {
      dispatch({ type: 'REMOVE_PANTRY_INGREDIENT', id: ingredient.id })
    })
  }

  const removePantryDish = () => {
    console.log('removed', ingredient)
    const dishesToRemove = existingPantryDishes.filter((existingDish) => !selectedPantryDishes.some((dish) => dish.id === existingDish.id));
    console.log('dishesToRemove', dishesToRemove)
    dishesToRemove.map(dish => {
      database.collection('users').doc(user.uid).collection('dishes').doc(dish.id).delete().then(() => {
          pantryDishDispatch({ type: 'REMOVE_PANTRY_DISH', id: dish.id })
      })
    })
  }

  const toggle = () => {
    setChecked(!checked)

    if (ingredient.isPantry === true) {
      removePantryIngredient()
      removePantryDish()
    } else {
      addPantryIngredient()
      addPantryDish()
    }

  }


  // }, [checked])

  return (
  <div>
    {pathname === '/pantry' ?
      <div className='ingredient-pantry-item'>
        <Checkbox
          toggle
          label={ingredient.name}
          checked={ingredient.isPantry}
          onChange={toggle}
        />
      </div>
          // ingredient.isPantry ?
          //   <button onClick={removePantryIngredient}>
          //     Remove from Pantry
          //   </button>
          // :
          // <button onClick={addPantryIngredient}>
          //   Add to Pantry
          // </button> 
      :
      <div className='ingredient-item' >
        <Label size='medium'>
          {ingredient.name}
          <Icon onClick={removeIngredient} name='delete' />
        </Label>
      </div>
    }
  </div>

  //   <div className='dish-preview' >
  //     <div className='image-container'>

  //     <h3>{ingredient.name}</h3>
  //     {/* <p>{ingredient.category}</p> */}
  //     <p>{ingredient.price}</p>
  //     {pathname === '/pantry' ?
  //       <div>
  //         {ingredient.isPantry ?
  //           <div>
  //             <span>Pantry</span>
  //             <button onClick={removePantryIngredient}>
  //               Remove from Pantry
  //             </button>
  //           </div>
  //           :
  //           <button onClick={addPantryIngredient}>
  //             Add to Pantry
  //           </button> 
  //         }
  //       </div>
  //       :
  //       <button onClick={removeIngredient}>Remove</button>}
  //   </div>
  // </div>
  )
}

export { IngredientListItem as default }