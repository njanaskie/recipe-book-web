import React, { useState, useContext } from 'react'
import DishesContext from '../../../context/dishes-context'
import useIngredients from '../../hooks/useIngredients'

const DishForm = () => {
    const { dishDispatch } = useContext(DishesContext)
    const [name, setName] = useState('')
    const [keyIngredients, setKeyIngredients] = useState([])
    const [optionalIngredients, setOptionalIngredients] = useState([])
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [cuisine, setCuisine] = useState('')
    const [recipes, setRecipes] = useState('')

    const ingredients = useIngredients()

    const addDish = () => {
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
        console.log('add dish')

        database.collection('dishes').add(dish).then((ref) => {
            dishDispatch(({ type: 'ADD_DISH', dish: {id: ref.key, ...dish} }))
        })

        setName('')
        setKeyIngredients([])
        setOptionalIngredients([])
        setDescription('')
        setType('')
        setCuisine('')
        setRecipes('')
    }
    
    return (
        <form onSubmit={addDish}>
            <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <select
                multiple={true}
                required={true}
                value={keyIngredients}
                onChange={(e) => setKeyIngredients(e.target.value)}
            >
                {ingredients.map((ingredient) =>
                        <option key={ingredient.id} value={ingredient.name}>{ingredient.name}</option>
                )}
            </select>
            <select
                multiple={true}
                required={true}
                value={optionalIngredients}
                onChange={(e) => setOptionalIngredients(e.target.value)}
            >
                {ingredients.map((ingredient) =>
                        <option key={ingredient.id} value={ingredient.name}>{ingredient.name}</option>
                )}
            </select>
            <textarea
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value='Breakfast'>Breakfast</option>
                <option value='Lunch'>Lunch</option>
                <option value='Dinner'>Dinner</option>
                <option value='Snack'>Snack</option>
                <option value='Dessert'>Dessert</option>
            </select>            
            <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
            >
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