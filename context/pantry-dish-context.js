import React, { useContext } from 'react';

const PantryDishContext = React.createContext()

export const usePantryDishContext = () => useContext(PantryDishContext)

export { PantryDishContext as default }