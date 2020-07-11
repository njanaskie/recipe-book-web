import React, { useContext } from 'react';

const FiltersContext = React.createContext()

export const useFiltersContext = () => useContext(FiltersContext)

export { FiltersContext as default }