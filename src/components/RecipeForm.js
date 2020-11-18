import React, { useEffect, useState } from 'react'
import { Tab, Button, Modal, Dropdown, Form, Select, Option } from 'semantic-ui-react'
import moment from 'moment'
import { useFirebaseContext } from '../../context/firebase-context'
import useIngredients from '../hooks/useIngredients'
import recipeTypes from '../fixtures/recipeTypes'
import recipeCuisines from '../fixtures/recipeCuisines'
import useCustomTags from '../hooks/useCustomTags'
import useAllRecipes from '../hooks/useAllRecipes'
import selectCustomTags from '../selectors/custom-tags'

const RecipeForm = (props) => {
    const { isGuest } = useFirebaseContext()
    const formResults = props.results ? props.results : useAllRecipes()
    const initialFormState = {
        url: '',
        ingredients: [],
        type: '',
        cuisine: '',
        createdAt: '',
        customTags: [],
        // recipeDish: props.recipeDish ? props.recipeDish : props.dish.name,
        error: '',
        customTagOptions: []
    }
    const [state, setState] = useState(initialFormState)
    // const [tagState, setTagState] = useState()
    const allIngredients = useIngredients()
    const allCustomTags = selectCustomTags(formResults.recipes)
    // const [customTagOptions, setCustomTagOptions] = useState(allCustomTags)
    // const allCustomTags = useCustomTags()
    // const selectableIngredients = allIngredients && Object.values(allIngredients).filter((ingredient) => !(props.dish.keyIngredients.includes(ingredient['name'])))

    // console.log(customTagOptions)
    // console.log(state)
    
    useEffect(() => {
        setState({
            url: props.url || '',
            ingredients: props.ingredients || [],
            type: props.type || '',
            cuisine: props.cuisine || '',
            createdAt: moment(props.createdAt) || moment(),
            customTags: props.customTags || [],
            // recipeDish: props.recipeDish ? props.recipeDish : props.dish.name,
            customTagOptions: props.customTagOptions || allCustomTags,
            error: '',
        })
    }, [props])

    const onSubmit = (e) => {
        e.preventDefault()

        const recipe = {
            url: state.url,
            ingredients: state.ingredients,
            type: state.type,
            cuisine: state.cuisine,
            createdAt: state.createdAt.valueOf(),
            customTags: state.customTags
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

    const onCustomTagChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, customTags: value })
    }

    const onAddCustomTag = (e, result) => {
        const { value } = result || e.target
        setState((prevState) => ({
            ...state,
            customTagOptions: [...prevState.customTagOptions, value]
        }))
    }

    return (
            <Form onSubmit={onSubmit} className='form-container'>
                {state.error && <p>{state.error}</p>}
                <Form.Input
                    type='url'
                    name='url'
                    placeholder='Insert URL'
                    value={state.url}
                    onChange={onURLChange}
                    fluid
                    // width={8}
                />
                <Form.Dropdown
                    placeholder='Add ingredients'
                    name='ingredients'
                    fluid multiple search selection
                    multiple={true}
                    value={state.ingredients.sort((a,b) => a.localeCompare(b))}
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
                    placeholder='Add custom tags'
                    name='customTags'
                    fluid multiple search selection
                    allowAdditions
                    // multiple={true}
                    value={state.customTags}
                    onChange={onCustomTagChange}
                    onAddItem={onAddCustomTag}
                    options={state.customTagOptions.map(tag => {
                        return {
                            key: tag,
                            text: tag,
                            value: tag.toLocaleString()
                        }
                    })}
                />

                <Form.Group>
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
                    <Form.Button fluid basic color='green' type='submit' disabled={isGuest ? true : false}>Save Recipe</Form.Button>
                </Form.Group>
            </Form>
        
    )
}

export default RecipeForm