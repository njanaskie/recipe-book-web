import React, { useContext, useReducer } from 'react';
import filtersReducer, { filtersReducerDefaultState } from '../src/reducers/filters'

const FiltersContext = React.createContext()

export const useFiltersContext = () => useContext(FiltersContext)

const FiltersProvider = ({ children }) => {
    const [filters, filtersDispatch] = useReducer(filtersReducer, filtersReducerDefaultState)

    return (
        <FiltersContext.Provider value={{ filters, filtersDispatch }}>
            {children}
        </FiltersContext.Provider>
    )
}

export { FiltersProvider, FiltersContext as default }