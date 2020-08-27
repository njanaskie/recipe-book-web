import React, { useState, useContext, useEffect } from 'react'
import { useDishesContext } from '../../../context/dishes-context'
import useIngredients from '../../hooks/useIngredients'
import { Form, Dropdown, TextArea } from 'semantic-ui-react'
import database from '../../firebase/firebase'
import dishTypes from '../../fixtures/dishTypes'
import dishCuisines from '../../fixtures/dishCuisines'

const DishForm = (props) => {
    const { dishDispatch } = useDishesContext()
    const initialFormState = {
        name: '',
        keyIngredients: [],
        optionalIngredients: [],
        description: '',
        type: '',
        cuisine: '',
        recipes: [''],
        error: '',
    }
    const [state, setState] = useState(initialFormState)
    const ingredients = useIngredients()
    const pathname = window.location.pathname
    
    useEffect(() => {
        setState({
            name: props.name || '',
            keyIngredients: props.keyIngredients || [],
            optionalIngredients: props.optionalIngredients || [],
            description: props.description || '',
            type: props.type || '',
            cuisine: props.cuisine || '',
            recipes: props.recipes || [''],
            error: ''
        })
    }, [props])

    const onSubmit = (e) => {
        e.preventDefault()
        const dish = {
            name: state.name,
            keyIngredients: state.keyIngredients,
            optionalIngredients: state.optionalIngredients,
            description: state.description,
            type: state.type,
            cuisine: state.cuisine,
            recipes: state.recipes,
        }

        if (!state.name || !state.keyIngredients || !state.type) {
            setState({ ...state, error: 'Please provide dish, key ingredients, type' })
        } else {
            props.onSubmit(dish)
            setState(initialFormState)
        }
    }

    const handleAddRecipeField = () => {
        setState({...state, recipes: [...state.recipes, '']})
    }

    const handleRemoveRecipeField = (i) => {
        const recipes = [...state.recipes.filter((r, rindx) => i !== rindx)]
        setState({...state, recipes: recipes })
    }

    const onNameChange = (e) => {
        const name = e.target.value
        setState({ ...state, name })
    }

    const onKeyIngredientChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, keyIngredients: value })
    }

    const onOptionalIngredientChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, optionalIngredients: value })
    }

    const onDescriptionChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, description: value })
    }  

    const onTypeChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, type: value })
    }

    const onCuisineChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, cuisine: value })
    }

    const onRecipeChange = (e, i) => {
        const recipes = [...state.recipes]
        recipes[i] = e.target.value
        setState({ ...state, recipes: recipes })
    }
    
    return (
        <div className='content-container'>
            <div className='form-container'>
                {pathname === '/add-dish' ? 
                    <h4>Add a dish to the site</h4>
                    :
                    <h4>Edit dish details</h4>
                }
                <Form className='form' onSubmit={onSubmit}>
                    {state.error && <p>{state.error}</p>}
                    <Form.Input
                        type='text'
                        placeholder='Name'
                        value={state.name || ''}
                        onChange={onNameChange}
                        width={6}
                    />
                    <Form.Group widths='equal'>
                        <div className='form-dropdown-group'>
                            <div className='form-item'>
                                <Dropdown
                                    placeholder='Select key ingredients'
                                    name='keyIngredients'
                                    clearable
                                    multiple selection
                                    multiple={true}
                                    value={state.keyIngredients}
                                    onChange={onKeyIngredientChange}
                                    options={ingredients.map(ingredient => {
                                        return {
                                            key: ingredient.id,
                                            text: ingredient.name,
                                            value: ingredient.name
                                        }
                                    })}
                                />
                            </div>
                            <div className='form-item'>
                                <Dropdown
                                    placeholder='Select optional ingredients'
                                    name='optionalIngredients'
                                    clearable
                                    multiple selection
                                    multiple={true}
                                    value={state.optionalIngredients}
                                    onChange={onOptionalIngredientChange}
                                    options={ingredients.map(ingredient => {
                                        return {
                                            key: ingredient.id,
                                            text: ingredient.name,
                                            value: ingredient.name
                                        }
                                    })}
                                />
                            </div>
                            <div className='form-item'>
                                <Dropdown
                                    placeholder='Select dish type'
                                    name='type'
                                    clearable
                                    fluid selection
                                    clearable={true}
                                    value={state.type}
                                    onChange={onTypeChange}
                                    options={dishTypes.map(dishType => {
                                        return {
                                            key: dishType,
                                            text: dishType,
                                            value: dishType
                                        }
                                    })}
                                />
                            </div>
                            <div className='form-item'>
                                <Dropdown
                                    placeholder='Select cuisine'
                                    name='cuisine'
                                    clearable
                                    fluid selection
                                    clearable={true}
                                    value={state.cuisine}
                                    onChange={onCuisineChange}
                                    options={dishCuisines.map(dishCuisine => {
                                        return {
                                            key: dishCuisine,
                                            text: dishCuisine,
                                            value: dishCuisine
                                        }
                                    })}
                                />
                            </div>
                        </div>
                    </Form.Group>
                    <div className='form-textarea'>
                        <TextArea
                            placeholder='Description'
                            value={state.description}
                            onChange={onDescriptionChange}
                        />
                    </div>
                    {
                        state.recipes && state.recipes.map((recipe, index) => (
                            <div className='form-recipes' key={index}>
                                <Form.Group inline >
                                    <Form.Input
                                        type='url'
                                        placeholder='Recipe links'
                                        value={recipe || ''}
                                        onChange={e => onRecipeChange(e, index)}
                                        width={10}
                                    />
                                    <Form.Button type='button' onClick={() => handleAddRecipeField()}>+</Form.Button>
                                    <Form.Button type='button' onClick={() => handleRemoveRecipeField(index)}>-</Form.Button>
                                </Form.Group>
                            </div>
                        ))
                    }
                    <Form.Button>Save Dish</Form.Button>
                    {pathname !== '/add-dish' && <Form.Button onClick={props.onRemove}>Remove Dish</Form.Button>
                    }
                </Form>
            </div>
        </div>
    )
}

export default DishForm