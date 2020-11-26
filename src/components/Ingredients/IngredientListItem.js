import React, { useContext, useState, useEffect } from 'react'
import { Checkbox, Button, Icon, Label, List } from 'semantic-ui-react'
import { useFirebaseContext } from '../../../context/firebase-context'
import { useIngredientsContext } from '../../../context/ingredients-context'
import { usePantryContext } from '../../../context/pantry-context'
import database, { firebase } from '../../firebase/firebase'
import { useDishesContext } from '../../../context/dishes-context'
import { usePantryDishContext } from '../../../context/pantry-dish-context'
import useDishes from '../../hooks/useDishes'
import useExistingPantryDishes from '../../hooks/useExistingPantryDishes'
import selectPantryDishes from '../../selectors/pantry-dishes'
import useAddPantryDish from '../../hooks/useAddPantryDish'
import useRemovePantryDish from '../../hooks/useRemovePantryDish'

const IngredientListItem = ({ ingredient }) => {
  const [checked, setChecked] = useState(ingredient.isPantry)
  const { user } = useFirebaseContext()
  const { dispatch } = useIngredientsContext()
  const { pantryIngredients, pantryDispatch } = usePantryContext()
  const { dishDispatch } = useDishesContext()
  const { pantryDishDispatch } = usePantryDishContext()
  // const dishes = useDishes()
  // const existingPantry = existingPantryDishes
  // const selectedPantry = selectedPantryDishes
  // const addPantryDish = useAddPantryDish(ingredient)
  // const removePantryDish = useRemovePantryDish(ingredient)

  // console.log(pantryIngredients)
  // console.log(dishes)
  // console.log(existingPantry)
  // console.log(selectedPantry)

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

  const removePantryIngredient = () => {
    const uid = user.uid

    database.collection('users').doc(uid).collection('pantry').doc(ingredient.id).delete().then(() => {
      dispatch({ type: 'REMOVE_PANTRY_INGREDIENT', id: ingredient.id })
    })
  }



// on pantry ingredient change, determine new selected pantry dishes 
// and map through, only adding if id not found in existing pantry dishes

  // useEffect(() => {
  //   console.log(existingPantry)
  //   console.log(selectedPantry)
  //   // const dishesToAdd = selectedPantry.filter((dish) => !existingPantry.some((existingDish) => existingDish.id === dish.id));
  //   const dishesToAdd = selectedPantry
  //   const dishesToRemove = existingPantry.filter(dish => dish.keyIngredients.includes(ingredient))
  //   console.log(dishesToAdd)
  //   console.log(dishesToRemove)

  //   if (dishesToAdd) {
  //     dishesToAdd.map(dish => {
  //       database.collection('users').doc(user.uid).collection('dishes').add(dish).then(() => {
  //         pantryDishDispatch({ type: 'ADD_PANTRY_DISH', dish })
  //         console.log('added pantry dish', dish)
  //       })
  //     })
  //   }

  //   if (dishesToRemove) {
  //     dishesToRemove.map(dish => {
  //       database.collection('users').doc(user.uid).collection('dishes').doc(dish.id).delete().then(() => {
  //           pantryDishDispatch({ type: 'REMOVE_PANTRY_DISH', id: dish.id })
  //           console.log('removed pantry dish', dish)
  //       })
  //     })
  //   }
  // }, [])

    // const addPantryDish = () => {
    //   console.log('added', ingredient)
    //   console.log(existingPantry)
    //   console.log(selectedPantry)
    //   const dishesToAdd = selectedPantry.filter((dish) => !existingPantry.some((existingDish) => existingDish.id === dish.id));
    //   console.log('dishesToAdd', dishesToAdd)
  
    //   // dishesToAdd.map(dish => {
    //   //   database.collection('users').doc(user.uid).collection('dishes').add(dish).then(() => {
    //   //     pantryDishDispatch({ type: 'ADD_PANTRY_DISH', dish })
    //   //     console.log('added pantry dish', dish)
    //   //   })
    //   // })
    // }
  
    // const removePantryDish = () => {
    //   console.log('removed', ingredient)
    //   console.log(existingPantry)
    //   console.log(selectedPantry)
    //   // const dishesToRemove = existingPantry.filter((existingDish) => !selectedPantry.some((dish) => dish.id === existingDish.id));
    //   const dishesToRemove = existingPantry.filter(dish => dish.keyIngredients.includes(ingredient))
    //   console.log('dishesToRemove', dishesToRemove)
  
    //   // dishesToRemove.map(dish => {
    //   //   database.collection('users').doc(user.uid).collection('dishes').doc(dish.id).delete().then(() => {
    //   //       pantryDishDispatch({ type: 'REMOVE_PANTRY_DISH', id: dish.id })
    //   //       console.log('removed pantry dish', dish)
    //   //   })
    //   // })
    // }


  const toggle = () => {
    setChecked(!checked)

    if (ingredient.isPantry === true) {
      removePantryIngredient()
      // removePantryDish()
      // removePantryDish
    } else {
      addPantryIngredient()
      // addPantryDish()
      // addPantryDish
    }

  }

  return (
    <List.Item>
      <List.Content floated='right'>
        <Button onClick={removeIngredient} icon='delete' size='tiny'/>
      </List.Content>
      <List.Content>
        <List.Header>{ingredient.name}</List.Header>
        <List.Description>{ingredient.category.toUpperCase()}</List.Description>
      </List.Content>
    </List.Item>

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