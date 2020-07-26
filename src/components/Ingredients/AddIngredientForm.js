import React, { useState, useContext } from 'react'
import IngredientsContext, { useIngredientsContext } from '../../../context/ingredients-context'
import database from '../../firebase/firebase'

const AddIngredientForm = (props) => {
    const [name, setName] = React.useState('')
    const [category, setCategory] = React.useState('dairy')
    const [price, setPrice] = React.useState('1')
    const [error, setError] = React.useState('')
    const { dispatch } = useIngredientsContext()

    const addIngredient = (e) => {
        e.preventDefault()
        const ingredient = {
            name,
            category,
            price
        }

        if (!name || !category || !price) {
            setError('Please provide name, category, and price')
        } else {
            database.collection('ingredients').add(ingredient).then((ref) => {
                dispatch(({ type: 'ADD_INGREDIENT', ingredient: {id: ref.key, ...ingredient} }))
            })
    
            setName('')
            setCategory('')
            setPrice('')
        }
    }

    const onNameChange = (e) => {
        const name = e.target.value
        if (name) {
            setName(name)
        }
    }

    const onCategoryChange = (e) => {
        const category = e.target.value
        if (category) {
            setCategory(category)
        }
    }

    const onPriceChange = (e) => {
        const price = e.target.value
        if (price) {
            setPrice(price)
        }
    }

    return (
        <div>
            <p>Add Ingredient</p>
            <form onSubmit={addIngredient}>
                {error && <p>{error}</p>}
                <input
                    id='set-name'
                    type='text'
                    placeholder='Name'
                    autoFocus
                    value={name}
                    onChange={onNameChange}
                />
                <select
                    id='set-category'
                    value={category}
                    onChange={onCategoryChange}
                >
                    <option value='dairy'>Dairy</option>
                    <option value='meats'>Meats</option>
                    <option value='seafood'>Seafood</option>
                    <option value='vegetables'>Vegetables</option>
                    <option value='fruit'>Fruit</option>
                    <option value='baking and grains'>Baking and Grains</option>
                    <option value='added sweeteners'>Added Sweeteners</option>
                    <option value='condiments'>Condiments</option>
                    <option value='spices'>Spices</option>
                    <option value='fish'>Fish</option>
                    <option value='oils'>Oils</option>
                    <option value='seasonings'>Seasonings</option>
                    <option value='sauces'>Sauces</option>
                    <option value='legumes'>Legumes</option>
                    <option value='alcohol'>Alcohol</option>
                    <option value='soup'>Soup</option>
                    <option value='nuts'>Nuts</option>
                    <option value='dairy alternatives'>Dairy Alternatives</option>
                    <option value='desserts and snacks'>Desserts and Snacks</option>
                    <option value='beverages'>Beverages</option>
                </select> 
                <select
                    id='set-price'
                    value={price}
                    onChange={onPriceChange}
                >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>
                <button>Add Ingredient</button>
            </form>
        </div>

    )
}

export default AddIngredientForm