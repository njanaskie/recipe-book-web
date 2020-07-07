import React, { useContext } from 'react';

const IngredientsContext = React.createContext()

export const useIngredientsContext = () => useContext(IngredientsContext)

export { IngredientsContext as default }