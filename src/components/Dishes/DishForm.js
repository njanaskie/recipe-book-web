import React, { useState, useContext } from 'react'
import DishesContext from '../../../context/dishes-context'
import useIngredients from '../../hooks/useIngredients'
import { Dropdown } from 'semantic-ui-react'

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

    const onKeyIngredientChange = (e, result) => {
        const { name, value } = result || e.target
        console.log('e: ', e)
        console.log('result: ', result)
        console.log('value: ', value)
        setKeyIngredients({ ...keyIngredients, [name]: value.toString() })
    }
    
    return (
        <form onSubmit={addDish}>
            <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Dropdown
                placeholder='Select key ingredients'
                name='keyIngredients'
                fluid search selection
                multiple={true}
                value={keyIngredients}
                onChange={onKeyIngredientChange}
                options={ingredients.map(ingredient => {
                    return {
                        key: ingredient.id,
                        text: ingredient.name,
                        value: ingredient.name
                    }
                })}
            />
            {/* <Dropdown
                placeholder='Select optional ingredients'
                name='optionalIngredients'
                selection
                multiple={true}
                value={optionalIngredients}
                onChange={(e) => setOptionalIngredients(e.target.value)}
                options={ingredients.map((ingredient) =>
                            <option key={ingredient.id} value={ingredient.name}>{ingredient.name}</option>
                        )}
            /> */}
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