import React, { useReducer, useEffect } from 'react'
import AddIngredientForm from './AddIngredientForm'
import IngredientsList from './IngredientsList'
import dishesReducer from '../../reducers/dishes'
import DishesContext from '../../../context/dishes-context'
import ingredientsReducer from '../../reducers/ingredients'
import IngredientsContext from '../../../context/ingredients-context'
import PantryContext from '../../../context/pantry-context'
import pantryReducer from '../../reducers/pantry'
import database from '../../firebase/firebase'

const IngredientsPage = () => {
    const [dishes, dishDispatch] = useReducer(dishesReducer, [])
    const [ingredients, dispatch] = useReducer(ingredientsReducer, [])
    const [pantryIngredients, pantryDispatch] = useReducer(pantryReducer, [])

    return (
        <DishesContext.Provider value={{ dishes, dishDispatch }}>
            <PantryContext.Provider value={{ pantryIngredients, pantryDispatch }}>
                <IngredientsContext.Provider value={{ ingredients, dispatch }}>
                    <AddIngredientForm />
                    <IngredientsList />
                </IngredientsContext.Provider>
            </PantryContext.Provider>
        </DishesContext.Provider>
    )

};

export default IngredientsPage;