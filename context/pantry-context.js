import React, { useContext } from 'react';

const PantryContext = React.createContext()

export const usePantryContext = () => useContext(PantryContext)

export { PantryContext as default }