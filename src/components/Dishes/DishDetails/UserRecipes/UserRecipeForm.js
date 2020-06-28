import React, { useEffect, useState } from 'react'
import { Tab, Button, Modal, Dropdown, Form } from 'semantic-ui-react'
import useIngredients from '../../../../hooks/useIngredients'

const UserRecipeForm = (props) => {
    const initialFormState = {
        url: '',
        additionalIngredients: [],
        recipeDish: props.recipeDish ? props.recipeDish : props.dish.name,
        error: ''
    }
    const [state, setState] = useState(initialFormState)
    const ingredients = useIngredients()

    console.log(props)
    console.log(state)

    useEffect(() => {
        setState({
            url: props.url || '',
            additionalIngredients: props.additionalIngredients || [],
            recipeDish: props.recipeDish ? props.recipeDish : props.dish.name,
            error: ''
        })
    }, [props])

    const onSubmit = (e) => {
        e.preventDefault()

        const recipe = {
            url: state.url,
            additionalIngredients: state.additionalIngredients,
            recipeDish: state.recipeDish
        }

        if (!state.url) {
            setState({ ...state, error: 'Please provide recipe URL' })
        } else {
            console.log('add recipe: ', recipe)
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

    const onAdditionalIngredientChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, additionalIngredients: value })
    }

    return (
        <Form onSubmit={onSubmit}>
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
        </Form>
    )
}

export default UserRecipeForm