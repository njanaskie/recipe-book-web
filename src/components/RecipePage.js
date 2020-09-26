import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ReactTinyLink } from 'react-tiny-link'
import { Tab, Button, Item, Label, List, Image } from 'semantic-ui-react'
import { useFirebaseContext } from '../../../../context/firebase-context'
import UserRecipeItem from './UserRecipes/UserRecipeItem';
import AddUserRecipe from './UserRecipes/AddUserRecipe';
import UserRecipeModal from './UserRecipes/UserRecipeModal'

const RecipePage = ({ dish = {}, userRecipes = [], ingredients = [] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { isAdmin } = useFirebaseContext()


    return (
        <div className='content-container'>
            <div className='dish-detail-container'>
                <Item.Group className='dish-item'>
                    <Item>
                        <Item.Image size='small' rounded src="/images/image-placeholder.png"/>
                        <Item.Content>
                            <Item.Header>{dish.name}</Item.Header>
                            {isAdmin && <div><Link to={`/edit/dish/${dish.id}`}>Edit Dish</Link></div>}
                            <Item.Meta>Description</Item.Meta>
                            <Item.Description>{dish.description}</Item.Description>
                            <Item.Extra>
                                {dish.cuisine && <Label>{dish.cuisine}</Label>}
                                {dish.type && <Label>{dish.type}</Label>}
                            </Item.Extra>
                            </Item.Content>
                        </Item>
                        <Item>
                            <Item.Content>
                                <List floated='right'>
                                    <List.Item>
                                        <List.Header>Key Ingredients</List.Header>
                                        {dish.keyIngredients && dish.keyIngredients.map(keyIngredient => <List.Item key={keyIngredient}>{keyIngredient}</List.Item>)}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Optional Ingredients</List.Header>
                                        {dish.optionalIngredients && dish.optionalIngredients.map(optionalIngredient => <List.Item key={optionalIngredient}>{optionalIngredient}</List.Item>)}
                                    </List.Item>
                                </List>
                            </Item.Content>
                        </Item>
                </Item.Group>
            </div>
        </div>
    )
}

export default RecipePage