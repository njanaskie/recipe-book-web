import React, { useContext } from 'react';

const RecipesContext = React.createContext()

export const useRecipesContext = () => useContext(RecipesContext)

export { RecipesContext as default }