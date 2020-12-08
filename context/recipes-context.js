import React, { useContext, useReducer } from 'react';
import recipesReducer from '../src/reducers/recipes'


const RecipesContext = React.createContext()

export const useRecipesContext = () => useContext(RecipesContext)

const RecipesProvider = ({ children }) => {
    const [recipes, recipeDispatch] = useReducer(recipesReducer, [])

    return (
        <RecipesContext.Provider value={{ recipes, recipeDispatch }}>
            {children}
        </RecipesContext.Provider>
    )
}

export { RecipesProvider, RecipesContext as default }