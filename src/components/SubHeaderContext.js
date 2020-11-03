import React, { useContext, useReducer } from 'react'
import RecipesContext from '../../context/recipes-context'
import recipesReducer from '../reducers/recipes'
import IngredientsContext from '../../context/ingredients-context'
import ingredientsReducer from '../reducers/ingredients'
import FirebaseContext from '../../context/firebase-context'
import firebaseReducer from '../reducers/filters'
import SubHeader from './SubHeader'

const SubHeaderContext = () => {
    const [recipes, recipeDispatch] = useReducer(recipesReducer, [])
    const [ingredients, dispatch ] = useReducer(ingredientsReducer, [])

    return (
        <div>
            <IngredientsContext.Provider value={{ ingredients, dispatch }}>
                <RecipesContext.Provider value={{ recipes, recipeDispatch }}>
                    <SubHeader/>
                </RecipesContext.Provider>
            </IngredientsContext.Provider>
        </div>
    )
}

export default SubHeaderContext