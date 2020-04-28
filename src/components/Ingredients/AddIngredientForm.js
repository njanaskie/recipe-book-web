import React, { useState, useContext } from 'react'
import IngredientsContext from '../../../context/ingredients-context'
import database from '../../firebase/firebase'


const AddIngredientForm = () => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('dairy')
    const [price, setPrice] = useState('1')
    const { dispatch } = useContext(IngredientsContext)

    const addIngredient = (e) => {
        e.preventDefault()
        const ingredient = {
            name,
            category,
            price
        }

        database.collection('ingredients').add(ingredient).then((ref) => {
            dispatch(({ type: 'ADD_INGREDIENT', ingredient: {id: ref.key, ...ingredient} }))
        })

        setName('')
        setCategory('')
        setPrice('')
    }

    return (
        <div>
            <p>Add Ingredient</p>
            <form onSubmit={addIngredient}>
                <input
                    type='text'
                    placeholder='Name'
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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