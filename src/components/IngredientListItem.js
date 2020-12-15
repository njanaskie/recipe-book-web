import React from 'react'
import { Button, List } from 'semantic-ui-react'
import { useIngredientsContext } from '../../context/ingredients-context'
import database from '../firebase/firebase'

const IngredientListItem = ({ ingredient }) => {
  const { dispatch, removeIngredient } = useIngredientsContext()

  const handleRemoveIngredient = () => {
    removeIngredient({ id: ingredient.id })
  }

  return (
    <List.Item>
      <List.Content floated='right'>
        <Button onClick={handleRemoveIngredient} icon='delete' size='tiny'/>
      </List.Content>
      <List.Content>
        <List.Header>{ingredient.name}</List.Header>
        <List.Description>{ingredient.category.toUpperCase()}</List.Description>
      </List.Content>
    </List.Item>
  )
}

export { IngredientListItem as default }