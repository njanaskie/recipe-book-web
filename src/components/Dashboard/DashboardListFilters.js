import React, { useState, useEffect, useContext } from 'react'
import { Input, Dropdown } from 'semantic-ui-react'
import FiltersContext from '../../../context/filters-context'
import PantryContext from '../../../context/pantry-context'

const DashboardListFilters = () => {
    const { filters, filtersDispatch } = useContext(FiltersContext)
    const { pantryIngredients } = useContext(PantryContext)

    const onTextChange = (e) => {
        filtersDispatch({ type: 'SET_TEXT_FILTER', text: e.target.value })
    }

    const onKeyIngredientChange = (e, result) => {
        const { value } = result || e.target
        filtersDispatch({ type: 'SET_KEY_INGREDIENT_FILTER', keyIngredients: value })
    }

    console.log(filters)

    return (
        <div>
            <Input
                placeholder='Search...'
                size='big'
                value={filters ? filters.text : ''}
                onChange={onTextChange}
            />
            <Dropdown
                placeholder='Select key ingredient'
                name='keyIngredient'
                fluid multiple selection
                multiple={true}
                value={filters ? filters.keyIngredients : []}
                onChange={onKeyIngredientChange}
                options={pantryIngredients.map(ingredient => {
                    return {
                        key: ingredient.id,
                        text: ingredient.name,
                        value: ingredient.name
                    }
                })}
            />
        </div>
    )
}

export default DashboardListFilters