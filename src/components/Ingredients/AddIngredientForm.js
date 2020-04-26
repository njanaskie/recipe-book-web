import React, { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import IngredientsContext from '../../../context/ingredients-context'
import database from '../../firebase/firebase'


const AddIngredientForm = () => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const { dispatch } = useContext(IngredientsContext)

    const addIngredient = (e) => {
        e.preventDefault()
        const ingredient = {
            name,
            category,
            price
        }

        database.ref('ingredients').push(ingredient).then((ref) => {
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
                <input
                    type='text'
                    placeholder='Category'
                    autoFocus
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Price'
                    autoFocus
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button>Add Ingredient</button>
            </form>
        </div>

    )
}

export default AddIngredientForm