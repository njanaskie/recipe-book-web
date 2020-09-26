import React, { useEffect, useState } from 'react'
import { Tab, Button, Modal, Dropdown, Form } from 'semantic-ui-react'
import useIngredients from '../../hooks/useIngredients'

const UserRecipeForm = (props) => {
    const initialFormState = {
        url: '',
        additionalIngredients: [],
        recipeDish: props.recipeDish ? props.recipeDish : props.dish.name,
        error: ''
    }
    const [state, setState] = useState(initialFormState)
    const ingredients = useIngredients()
    const additionalIngredients = ingredients && Object.values(ingredients).filter((ingredient) => !(props.dish.keyIngredients.includes(ingredient['name'])))

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
                        placeholder='Add additional ingredients'
                        name='additionalIngredients'
                        fluid multiple selection
                        multiple={true}
                        value={state.additionalIngredients}
                        onChange={onAdditionalIngredientChange}
                        options={additionalIngredients.map(ingredient => {
                            return {
                                key: ingredient.id,
                                text: ingredient.name,
                                value: ingredient.name
                            }
                        })}
                    />
                    <Form.Button fluid basic color='green' type='submit'>Save Recipe</Form.Button>
                </Form.Group>
            </Form>
        </div>
        
    )
}

export default UserRecipeForm