import React, { useEffect, useState } from 'react'
import { Form } from 'semantic-ui-react'
import moment from 'moment'
import { useFirebaseContext } from '../context/firebase-context'
import recipeTypes from '../fixtures/recipeTypes'
import recipeCuisines from '../fixtures/recipeCuisines'
import selectCustomTags from '../selectors/custom-tags'
import { useIngredientsContext } from '../context/ingredients-context'
import { useRecipesContext } from '../context/recipes-context'

const RecipeForm = (props) => {
    const { isGuest, user } = useFirebaseContext()
    const { recipes } = useRecipesContext()
    const formResults = props.results ? props.results : recipes
    const initialFormState = {
        url: '',
        ingredients: [],
        type: '',
        cuisine: '',
        // createdAt: '',
        customTags: [],
        savedBy: '',
        error: '',
        customTagOptions: []
    }
    const [state, setState] = useState(initialFormState)
    const { ingredients } = useIngredientsContext()
    const allCustomTags = selectCustomTags(formResults)
    const uid = user.uid
    
    useEffect(() => {
        setState({
            url: props.url || '',
            ingredients: props.ingredients || [],
            type: props.type || '',
            cuisine: props.cuisine || '',
            // createdAt: moment(props.createdAt) || moment(),
            savedBy: props.savedBy || uid,
            customTags: props.customTags || [],
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
            // createdAt: state.createdAt.valueOf(),
            customTags: state.customTags,
            savedBy: state.savedBy
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
        <>
            <Form onSubmit={onSubmit} className='form-container'>
                {state.error && <p className='form__error'>{state.error}</p>}
                <Form.Input
                    type='url'
                    name='url'
                    placeholder='Insert URL'
                    value={state.url}
                    onChange={onURLChange}
                    fluid
                />
                <Form.Dropdown
                    placeholder='Add ingredients'
                    name='ingredients'
                    fluid multiple search selection
                    multiple={true}
                    value={state.ingredients.sort((a,b) => a.localeCompare(b))}
                    onChange={onIngredientChange}
                    options={ingredients.map(ingredient => {
                        return {
                            key: ingredient.name,
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

                <Form.Group widths='equal'>
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
        </>
        
    )
}

export default RecipeForm