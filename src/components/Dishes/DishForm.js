import React, { useReducer, useContext } from 'react'
import IngredientsContext from '../../../context/ingredients-context'

const DishForm = () => {
    const { ingredients } = useContext(IngredientsContext)
    const [name, setName] = useReducer('')
    const [keyIngredients, setKeyIngredients] = useReducer('')
    const [optionalIngredients, setOptionalIngredient] = useReducer('')
    const [description, setDescription] = useReducer('')
    const [type, setType] = useReducer('')
    const [cuisine, setCuisine] = useReducer('')
    const [recipes, setRecipes] = useReducer('')

    //need to return from firebase, may be time to refactor all dispatches into redux store
    
    return (
        <form>
            <input
                type='text'
                placeholder='Dish Name'
            />
            <select
                multiple={true}
                required={true}
                value={keyIngredients}
                onChange={(e) => setKeyIngredients(e.target.value)}
            >
                {/* <option value='test'>test</option>
                <option value='test2'>test2</option> */}
                {ingredients.map((ingredient) =>
                        <option key={ingredient.id} value={ingredient.name}>{ingredient.name}</option>
                )}
            </select>
            <input
                type='text'
                placeholder='Optional Ingredients'
            />
            <input
                type='text'
                placeholder='Description'
            />
            <input
                type='text'
                placeholder='Links'
            />
        </form>
    )
}

export default DishForm