import React, { useState, useEffect, useContext } from 'react'
import { Input, Dropdown } from 'semantic-ui-react'
import FiltersContext from '../../../context/filters-context'
import PantryContext from '../../../context/pantry-context'
import dishCuisines from '../../fixtures/dishCuisines'
import dishTypes from '../../fixtures/dishTypes'

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

    const onCuisineChange = (e, result) => {
        const { value } = result || e.target
        filtersDispatch({ type: 'SET_CUISINE_FILTER', cuisine: value })
    }

    const onTypeChange = (e, result) => {
        const { value } = result || e.target
        filtersDispatch({ type: 'SET_TYPE_FILTER', dishType: value })
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
            <Dropdown
                placeholder='Select cuisine'
                name='cuisine'
                fluid selection
                value={filters ? filters.cuisine : ''}
                onChange={onCuisineChange}
                options={dishCuisines.map(dishCuisine => {
                    return {
                        key: dishCuisine,
                        text: dishCuisine,
                        value: dishCuisine
                    }
                })}
            />
            <Dropdown
                placeholder='Select type'
                name='type'
                fluid selection
                value={filters ? filters.dishType : ''}
                onChange={onTypeChange}
                options={dishTypes.map(dishType => {
                    return {
                        key: dishType,
                        text: dishType,
                        value: dishType
                    }
                })}
            />
        </div>
    )
}

export default DashboardListFilters