import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ReactTinyLink } from 'react-tiny-link'
import { Tab, Button, Item, Label, List, Image } from 'semantic-ui-react'
import { useFirebaseContext } from '../../../../context/firebase-context'
import UserRecipeItem from './UserRecipes/UserRecipeItem';
import AddUserRecipe from './UserRecipes/AddUserRecipe';
import UserRecipeModal from './UserRecipes/UserRecipeModal'

const DetailContent = ({ dish = {}, userRecipes = [], ingredients = [] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { isAdmin } = useFirebaseContext()

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const panes = [
        {
            menuItem: 'Suggested Recipes',
            render: () => <Tab.Pane>{dish.recipes && dish.recipes.map(recipe => recipe ? <ReactTinyLink key={recipe} url={recipe}>{recipe}</ReactTinyLink> : <p key={recipe}>No Suggested Recipes</p>)}</Tab.Pane>
        },
        {
            menuItem: 'My Saved Recipes',
            render: () => <Tab.Pane>{userRecipes.length > 0 ? userRecipes.map((recipe) => <UserRecipeItem key={recipe.id} recipe={recipe} dish={dish} isModalOpen={isModalOpen} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose}/>) : <p>No Saved Recipes</p>}</Tab.Pane>
        },
    ]

    return (
        <div className='content-container'>
            <div className='dish-detail-container'>
                <Item.Group className='dish-item'>
                    <Item>
                        <Item.Image size='small' rounded src="/images/image-placeholder.png"/>
                        <Item.Content>
                            <Item.Header>{dish.name}</Item.Header>
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
                <div>
                    <h3>Recipes</h3>
                    <UserRecipeModal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
                        <AddUserRecipe dish={dish} handleModalClose={handleModalClose}/>
                    </UserRecipeModal>
                    <Button color='green' onClick={handleModalOpen}>Add Recipe</Button>
                    <Tab panes={panes}/>
                </div>
                {isAdmin && <Link to={`/edit/dish/${dish.id}`}>Edit Dish</Link>}
            </div>
        </div>
    )

}

export default DetailContent