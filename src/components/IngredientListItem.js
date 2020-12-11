import React from 'react'
import { Button, List } from 'semantic-ui-react'
import { useIngredientsContext } from '../../context/ingredients-context'
import database from '../firebase/firebase'

const IngredientListItem = ({ ingredient }) => {
  const { dispatch } = useIngredientsContext()

  const removeIngredient = () => {
    database.collection('ingredients').doc(ingredient.id).delete().then(() => {
      dispatch({ type: 'REMOVE_INGREDIENT', id: ingredient.id })
    })
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
  )
}

export { IngredientListItem as default }