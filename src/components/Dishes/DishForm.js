import React, { useState, useContext } from 'react'
import DishesContext from '../../../context/dishes-context'
import useIngredients from '../../hooks/useIngredients'
import { Dropdown } from 'semantic-ui-react'
import database from '../../firebase/firebase'

const DishForm = (dish) => {
    const { dishDispatch } = useContext(DishesContext)
    const [error, setError] = useState('')
    const [name, setName] = useState(dish.name)
    const [keyIngredients, setKeyIngredients] = useState([])
    const [optionalIngredients, setOptionalIngredients] = useState([])
    const [description, setDescription] = useState('')
    const [type, setType] = useState('Breakfast')
    const [cuisine, setCuisine] = useState('')
    const [recipes, setRecipes] = useState('')

    const ingredients = useIngredients()

    const addDish = (e) => {
        e.preventDefault()
        const dish = {
            name,
            keyIngredients,
            optionalIngredients,
            description,
            type,
            cuisine,
            recipes
        }

        if (!name || !keyIngredients || !type) {
            setError('Please provide dish, key ingredients, type')
        } else {
            console.log('add dish')
            database.collection('dishes').add(dish).then((ref) => {
                dishDispatch(({ type: 'ADD_DISH', dish: {id: ref.key, ...dish} }))
            })
        }

        setName('')
        setKeyIngredients([])
        setOptionalIngredients([])
        setDescription('')
        setType('')
        setCuisine('')
        setRecipes('')
    }

    const onNameChange = (e) => {
        const name = e.target.value
        if (name) {
            setName(name)
        }
    }

    const onKeyIngredientChange = (e, result) => {
        const { value } = result || e.target
        setKeyIngredients(value)
    }

    const onOptionalIngredientChange = (e, result) => {
        const { value } = result || e.target
        setOptionalIngredients(value)
    }

    const onTypeChange = (e) => {
        const type = e.target.value
        if (type) {
            setType(type)
        }
    }

    const onCuisineChange = (e) => {
        const cuisine = e.target.value
        if (cuisine) {
            setCuisine(cuisine)
        }
    }
    
    return (
        <form onSubmit={addDish}>
            {error && <p>{error}</p>}
            <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={onNameChange}
            />
            <Dropdown
                placeholder='Select key ingredients'
                name='keyIngredients'
                fluid multiple selection
                multiple={true}
                defaultValue={keyIngredients.toString()}
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
                defaultValue={optionalIngredients.toString()}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select
                value={type}
                onChange={onTypeChange}
            >
                <option value='Breakfast'>Breakfast</option>
                <option value='Lunch'>Lunch</option>
                <option value='Dinner'>Dinner</option>
                <option value='Snack'>Snack</option>
                <option value='Dessert'>Dessert</option>
            </select>            
            <select
                value={cuisine}
                onChange={onCuisineChange}
            >
                <option value=''>--</option>
                <option value='Mexican'>Mexican</option>
                <option value='Italian'>Italian</option>
                <option value='Asian'>Asian</option>
                <option value='Indian'>Indian</option>
                <option value='Mediterranean'>Mediterranean</option>
                <option value='Thai'>Thai</option>
                <option value='French'>French</option>
                <option value='German'>German</option>
                <option value='Carribbean'>Carribbean</option>
            </select>
            <input
                type='url'
                placeholder='Recipe links'
                value={recipes}
                onChange={(e) => setRecipes(e.target.value)}
            />
            <button>Add Dish</button>
        </form>
    )
}

export default DishForm