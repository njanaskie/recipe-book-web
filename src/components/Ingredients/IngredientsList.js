import React, { useContext } from 'react'
import IngredientListItem from './IngredientListItem'
import IngredientsContext from '../../../context/ingredients-context'
import database from '../../firebase/firebase'

const IngredientsList = () => {
  const { ingredients, dispatch } = useContext(IngredientsContext)

  database.ref('ingredients')
  .once('value')
  .then((snapshot) => {
      const ingredients = [];

      snapshot.forEach((childSnapshot) => {
          ingredients.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
          });
      });

      dispatch({ type: 'SET_INGREDIENTS', ingredients})
  });

  return ingredients.map((ingredient) => (
      <IngredientListItem key={ingredient.id} ingredient={ingredient} />
    ))
}

export { IngredientsList as default }