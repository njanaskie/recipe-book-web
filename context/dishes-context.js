import React, { useContext } from 'react';

const DishesContext = React.createContext()

export const useDishesContext = () => useContext(DishesContext)

export { DishesContext as default }