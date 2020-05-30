import React, { useState, useEffect, useContext } from 'react'
import { Input } from 'semantic-ui-react'
import FiltersContext from '../../../context/filters-context'

const DashboardListFilters = () => {
    const { filters, filtersDispatch } = useContext(FiltersContext)

    const onTextChange = (e) => {
        filtersDispatch({ type: 'SET_TEXT_FILTER', text: e.target.value })
    }
    
    return (
        <Input
            placeholder='Search...'
            size='big'
            value={filters ? filters.text : ''}
            onChange={onTextChange}
        />
    )
}

export default DashboardListFilters