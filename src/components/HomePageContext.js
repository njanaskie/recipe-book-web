import React, { useReducer } from 'react'
import dishesReducer from '../reducers/dishes'
import DishesContext from '../../context/dishes-context'
import PantryContext from '../../context/pantry-context'
import FiltersContext from '../../context/filters-context'
import PantryDishContext from '../../context/pantry-dish-context'
import pantryDishesReducer from '../reducers/pantry-dishes'
import pantryReducer from '../reducers/pantry'
import filtersReducer from '../reducers/filters'
import RecipesContext from '../../context/recipes-context'
import recipesReducer from '../reducers/recipes'
import IngredientsContext from '../../context/ingredients-context'
import ingredientsReducer from '../reducers/ingredients'
import HomePage from './HomePage'


const HomePageContext = () => {
    const [dishes, dishDispatch] = useReducer(dishesReducer, [])
    const [pantryIngredients, pantryDispatch] = useReducer(pantryReducer, [])
    const [filters, filtersDispatch] = useReducer(filtersReducer)
    const [pantryDishes, pantryDishDispatch] = useReducer(pantryDishesReducer, [])
    const [recipes, recipeDispatch] = useReducer(recipesReducer, [])
    const [ingredients, dispatch ] = useReducer(ingredientsReducer, [])

    return (
        <IngredientsContext.Provider value={{ ingredients, dispatch }}>
            <FiltersContext.Provider value={{ filters, filtersDispatch }}>
                <RecipesContext.Provider value={{ recipes, recipeDispatch }}>
                    <HomePage />
                </RecipesContext.Provider>
            </FiltersContext.Provider>
        </IngredientsContext.Provider>
    )

};

export default HomePageContext;