import React, { useState, useContext, useEffect } from 'react'
import DishesContext from '../../../context/dishes-context'
import useIngredients from '../../hooks/useIngredients'
import { Dropdown } from 'semantic-ui-react'
import database from '../../firebase/firebase'
import dishTypes from '../../fixtures/dishTypes'
import dishCuisines from '../../fixtures/dishCuisines'

const DishForm = (props) => {
    const { dishDispatch } = useContext(DishesContext)
    const initialFormState = {
        name: '',
        keyIngredients: [],
        optionalIngredients: [],
        description: '',
        type: '',
        cuisine: '',
        recipes: '',
        error: '',
    }
    const [state, setState] = useState(initialFormState)
    const ingredients = useIngredients()
    
    useEffect(() => {
        setState({
            name: props.name || '',
            keyIngredients: props.keyIngredients || [],
            optionalIngredients: props.optionalIngredients || [],
            description: props.description || '',
            type: props.type || '',
            cuisine: props.cuisine || '',
            recipes: props.recipes || '',
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
            console.log('add dish')
            props.onSubmit(dish)
            setState(initialFormState)
        }
    }

    const onNameChange = (e) => {
        const name = e.target.value
        if (name) {
            setState({ ...state, name })
        }
    }

    const onKeyIngredientChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, keyIngredients: value })
    }

    const onOptionalIngredientChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, optionalIngredients: value })
    }

    const onDescriptionChange = (e) => {
        const description = e.target.value
        setState({ ...state, description })
    }  

    const onTypeChange = (e, result) => {
        const { value } = result || e.target
        if (value) {
            setState({ ...state, type: value })
        }
    }

    const onCuisineChange = (e, result) => {
        const { value } = result || e.target
        if (value) {
            setState({ ...state, cuisine: value })
        }
    }

    const onRecipeChange = (e) => {
        const recipes = e.target.value
        setState({ ...state, recipes })
    }
    
    return (
        <form onSubmit={onSubmit}>
            {state.error && <p>{state.error}</p>}
            <input
                type='text'
                placeholder='Name'
                value={state.name || ''}
                onChange={onNameChange}
            />
            <Dropdown
                placeholder='Select key ingredients'
                name='keyIngredients'
                fluid multiple selection
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
            <Dropdown
                placeholder='Select optional ingredients'
                name='optionalIngredients'
                fluid multiple selection
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
            <textarea
                placeholder='Description'
                value={state.description}
                onChange={onDescriptionChange}
            />
            <Dropdown
                placeholder='Select dish type'
                name='type'
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
            <Dropdown
                placeholder='Select cuisine'
                name='cuisine'
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
            <input
                type='text'
                placeholder='Recipe links'
                value={state.recipes || ''}
                onChange={onRecipeChange}
            />
            <button>Save Dish</button>
        </form>
    )
}

export default DishForm