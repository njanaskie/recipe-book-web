import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ReactTinyLink } from 'react-tiny-link'
import { Tab, Button, Modal, Dropdown, Form } from 'semantic-ui-react'
import FirebaseContext from '../../../../context/firebase-context'
import RecipesContext from '../../../../context/recipes-context'
import useIngredients from '../../../hooks/useIngredients'
import useUserRecipes from '../../../hooks/useUserRecipes'
import database from '../../../firebase/firebase'

const DetailContent = ({ dish = {}, userRecipes = [], ingredients = [] }) => {
    const initialFormState = {
        url: '',
        additionalIngredients: [],
        error: ''
    }
    const [state, setState] = useState(initialFormState)
    const { isAdmin } = useContext(FirebaseContext)
    const { recipeDispatch } = useContext(RecipesContext)
    const { user } = useContext(FirebaseContext)

    const onSubmit = (e) => {
        e.preventDefault()

        const recipe = {
            url: state.url,
            additionalIngredients: state.additionalIngredients
        }

        if (!state.url) {
            setState({ ...state, error: 'Please provide recipe URL' })
        } else {
            console.log('add recipe: ', recipe)
            database.collection('users').doc(user.uid).collection('recipes').add(recipe).then((ref) => {
                recipeDispatch({ type: 'ADD_RECIPE', recipe: {id: ref.key, ...recipe} })
            })
            setState(initialFormState)
            
        }
    }

    const onURLChange = (e) => {
        const url = e.target.value
        if (url) {
            setState({ ...state, url })
        }
    }

    const onAdditionalIngredientChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, additionalIngredients: value })
    }

    const panes = [
        {
            menuItem: 'Suggested Recipes',
            render: () => <Tab.Pane>{dish.recipes && dish.recipes.map(recipe => <ReactTinyLink key={recipe} url={recipe}>{recipe}</ReactTinyLink>)}</Tab.Pane>
        },
        {
            menuItem: 'My Saved Recipes',
        render: () => <Tab.Pane>{userRecipes ? userRecipes.map(recipe => <ReactTinyLink key={recipe.id} url={recipe.url}>{recipe.url}</ReactTinyLink>) : <p>No Saved Recipes</p>}</Tab.Pane>
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
                <Modal as={Form} onSubmit={onSubmit} trigger={<Button color='green'>Add Recipe</Button>}>
                    <Modal.Header>Add Recipe</Modal.Header>
                    <Modal.Content>
                        {state.error && <p>{state.error}</p>}
                        <Form.Input
                            type='url'
                            name='url'
                            placeholder='Insert URL'
                            value={state.url}
                            onChange={onURLChange}
                        />
                        <Dropdown
                            placeholder='Add additional ingredients'
                            name='additionalIngredients'
                            fluid multiple selection
                            multiple={true}
                            value={state.additionalIngredients}
                            onChange={onAdditionalIngredientChange}
                            options={ingredients.map(ingredient => {
                                return {
                                    key: ingredient.id,
                                    text: ingredient.name,
                                    value: ingredient.name
                                }
                            })}
                        />
                        <Button type='submit'>+</Button>
                    </Modal.Content>
                </Modal>
                <Tab panes={panes}/>
            </div>
            {isAdmin && <Link to={`/edit/dish/${dish.id}`}>Edit Dish</Link>}
        </div>
    )

}

export default DetailContent