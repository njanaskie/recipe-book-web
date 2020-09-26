import React, { useEffect, useState } from 'react'
import { Tab, Button, Modal, Dropdown, Form } from 'semantic-ui-react'
import useIngredients from '../hooks/useIngredients'
import recipeTypes from '../fixtures/recipeTypes'
import recipeCuisines from '../fixtures/recipeCuisines'

const RecipeForm = (props) => {
    const initialFormState = {
        url: '',
        ingredients: [],
        type: '',
        cuisine: '',
        // recipeDish: props.recipeDish ? props.recipeDish : props.dish.name,
        error: ''
    }
    const [state, setState] = useState(initialFormState)
    const allIngredients = useIngredients()
    // const selectableIngredients = allIngredients && Object.values(allIngredients).filter((ingredient) => !(props.dish.keyIngredients.includes(ingredient['name'])))

    useEffect(() => {
        setState({
            url: props.url || '',
            ingredients: props.ingredients || [],
            type: props.type || '',
            cuisine: props.cuisine || '',
            // recipeDish: props.recipeDish ? props.recipeDish : props.dish.name,
            error: ''
        })
    }, [props])

    const onSubmit = (e) => {
        e.preventDefault()

        const recipe = {
            url: state.url,
            ingredients: state.ingredients,
            type: state.type,
            cuisine: state.cuisine
            // recipeDish: state.recipeDish
        }

        if (!state.url) {
            setState({ ...state, error: 'Please provide recipe URL' })
        } else {
            props.onSubmit(recipe)
            setState(initialFormState)
        }
    }

    const onURLChange = (e) => {
        const url = e.target.value
        if (url) {
            setState({ ...state, url })
        }
    }

    const onIngredientChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, ingredients: value })
    }

    const onTypeChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, type: value })
    }

    const onCuisineChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, cuisine: value })
    }

    return (
        <div className='form-container'>
            <Form className='form' onSubmit={onSubmit}>
                {state.error && <p>{state.error}</p>}
                <Form.Group >
                    <Form.Input
                        type='url'
                        name='url'
                        placeholder='Insert URL'
                        value={state.url}
                        onChange={onURLChange}
                        fluid
                        width={8}
                    />
                    <Form.Dropdown
                        placeholder='Add ingredients'
                        name='ingredients'
                        fluid multiple selection
                        multiple={true}
                        value={state.ingredients}
                        onChange={onIngredientChange}
                        options={allIngredients.map(ingredient => {
                            return {
                                key: ingredient.id,
                                text: ingredient.name,
                                value: ingredient.name
                            }
                        })}
                    />
                    <Form.Dropdown
                        placeholder='Select recipe type'
                        name='type'
                        clearable
                        fluid selection
                        clearable={true}
                        value={state.type}
                        onChange={onTypeChange}
                        options={recipeTypes.map(recipeType => {
                            return {
                                key: recipeType,
                                text: recipeType,
                                value: recipeType
                            }
                        })}
                    />
                    <Form.Dropdown
                        placeholder='Select cuisine'
                        name='cuisine'
                        clearable
                        fluid selection
                        clearable={true}
                        value={state.cuisine}
                        onChange={onCuisineChange}
                        options={recipeCuisines.map(recipeCuisine => {
                            return {
                                key: recipeCuisine,
                                text: recipeCuisine,
                                value: recipeCuisine
                            }
                        })}
                    />
                    <Form.Button fluid basic color='green' type='submit'>Save Recipe</Form.Button>
                </Form.Group>
            </Form>
        </div>
        
    )
}

export default RecipeForm