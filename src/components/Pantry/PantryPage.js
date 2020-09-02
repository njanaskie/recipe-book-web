import React, { useReducer, useEffect } from 'react';
import IngredientsList from '../Ingredients/IngredientsList'
import dishesReducer from '../../reducers/dishes'
import DishesContext from '../../../context/dishes-context'
import IngredientsContext from '../../../context/ingredients-context'
import ingredientsReducer from '../../reducers/ingredients'
import PantryContext from '../../../context/pantry-context'
import pantryReducer from '../../reducers/pantry'

const PantryPage = () => {
    const [dishes, dishDispatch] = useReducer(dishesReducer, [])
    const [ingredients, dispatch] = useReducer(ingredientsReducer, [])
    const [pantryIngredients, pantryDispatch] = useReducer(pantryReducer, [])

    return (
        <DishesContext.Provider value={{ dishes, dishDispatch }}>
            <PantryContext.Provider value={{ pantryIngredients, pantryDispatch }}>
                <IngredientsContext.Provider value={{ ingredients, dispatch }}>
                    <div className='content-container'>
                        <h3 className='list-item__subtitle'>My Pantry</h3>
                    </div>
                    <IngredientsList />
                </IngredientsContext.Provider>
            </PantryContext.Provider>
        </DishesContext.Provider>

    )
};

export default PantryPage;