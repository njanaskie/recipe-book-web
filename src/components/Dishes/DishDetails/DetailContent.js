import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ReactTinyLink } from 'react-tiny-link'
import { Tab, Button, Modal, Dropdown, Form } from 'semantic-ui-react'
import FirebaseContext from '../../../../context/firebase-context'
import RecipesContext from '../../../../context/recipes-context'
import useIngredients from '../../../hooks/useIngredients'
import useUserRecipes from '../../../hooks/useUserRecipes'
import database from '../../../firebase/firebase'
import UserRecipeItem from './UserRecipes/UserRecipeItem';
import UserRecipeForm from './UserRecipes/UserRecipeForm';
import AddUserRecipe from './UserRecipes/AddUserRecipe';
import EditUserRecipe from './UserRecipes/EditUserRecipe'

const DetailContent = ({ dish = {}, userRecipes = [], ingredients = [] }) => {
    const initialFormState = {
        isModalOpen: false,
    }
    const [state, setState] = useState(initialFormState)
    const { isAdmin } = useContext(FirebaseContext)
    const { recipeDispatch } = useContext(RecipesContext)
    const { user } = useContext(FirebaseContext)

    const handleModalOpen = () => {
        setState({
            ...state,
            isModalOpen: true
        })
    }

    console.log(dish.recipes)
    console.log(userRecipes)

    const panes = [
        {
            menuItem: 'Suggested Recipes',
            render: () => <Tab.Pane>{dish.recipes && dish.recipes.map(recipe => recipe ? <ReactTinyLink key={recipe} url={recipe}>{recipe}</ReactTinyLink> : <p key={recipe}>No Suggested Recipes</p>)}</Tab.Pane>
        },
        {
            menuItem: 'My Saved Recipes',
            render: () => <Tab.Pane>{userRecipes && userRecipes.map((recipe, id) => recipe ? <UserRecipeItem key={id} recipe={recipe} dish={dish}/> : <p>No Saved Recipes</p>)}</Tab.Pane>
        },
    ]

    // const additionalIngredients = dish.keyIngredients && dish.keyIngredients.filter((keyIngredient) => {
    //     !ingredients.includes(keyIngredient)
    // })
    return (
        <div>
            <p>{dish.name}</p>
            <p>{dish.description}</p>
            <p>{dish.cuisine}</p>
            <p>{dish.type}</p>
            <h4>Key Ingredients</h4>
            {dish.keyIngredients && dish.keyIngredients.map(keyIngredient => <li key={keyIngredient}>{keyIngredient}</li>)}
            <h4>Optional Ingredients</h4>
            {dish.optionalIngredients && dish.optionalIngredients.map(optionalIngredient => <li key={optionalIngredient}>{optionalIngredient}</li>)}
            <div>
                <h3>Recipes</h3>
                <Modal open={state.isModalOpen} onClose={() => setState({ ...state, isModalOpen: false }) }>
                    <Modal.Header>Add Recipe</Modal.Header>
                    <Modal.Content>
                        <AddUserRecipe dish={dish} />
                    </Modal.Content>
                </Modal>
                <Button color='green' onClick={handleModalOpen}>Add Recipe</Button>
                <Tab panes={panes}/>
            </div>
            {isAdmin && <Link to={`/edit/dish/${dish.id}`}>Edit Dish</Link>}
        </div>
    )

}

export default DetailContent