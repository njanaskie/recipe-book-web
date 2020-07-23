import React from 'react'
import PropTypes from 'prop-types'
import { shallow, mount } from 'enzyme'
import { DashboardListFilters } from '../DashboardListFilters'
import * as AllFiltersContext from '../../../../context/filters-context'
import FiltersContext, { useFiltersContext } from '../../../../context/filters-context'
import * as AllPantryContext from '../../../../context/pantry-context'
import PantryContext from '../../../../context/pantry-context'
import { filters, altFilters } from '../../../tests/fixtures/filters'
import ingredients from '../../../tests/fixtures/ingredients'

let setTextFilter, setKeyIngredientFilter, setCuisineFilter, setTypeFilter, mockFiltersDispatch;

beforeEach(() => {
    setTextFilter = jest.fn()
    setKeyIngredientFilter = jest.fn()
    setCuisineFilter = jest.fn()
    setTypeFilter = jest.fn()
    mockFiltersDispatch = jest.fn()
    // jest.spyOn(AllPantryContext, 'usePantryContext').mockImplementation(() => ingredients)
})

test('should render DashbaordListFilters correctly', () => {
    const wrapper = shallow(
        <FiltersContext.Provider value={{ filters }}>
            <DashboardListFilters
                filters={filters}
                setTextFilter={setTextFilter}
                setKeyIngredientFilter={setKeyIngredientFilter}
                setCuisineFilter={setCuisineFilter}
                setTypeFilter={setTypeFilter}
            />
        </FiltersContext.Provider>
    )
    expect(wrapper).toMatchSnapshot();
})

test('should render DashbaordListFilters with alt filters', () => {
    const wrapper = shallow(
        <FiltersContext.Provider value={{ filters }}>
            <DashboardListFilters
                filters={altFilters}
                setTextFilter={setTextFilter}
                setKeyIngredientFilter={setKeyIngredientFilter}
                setCuisineFilter={setCuisineFilter}
                setTypeFilter={setTypeFilter}
            />
        </FiltersContext.Provider>
    )
    expect(wrapper).toMatchSnapshot();
})

// use this test for full component snapshot testing
test('should handle text change', () => {
    const value = 'eggs'
    const wrapper = mount(
        <FiltersContext.Provider value={{ filters, filtersDispatch: mockFiltersDispatch }}>
            <PantryContext.Provider value={{ pantryIngredients: ingredients }}>
                <DashboardListFilters
                    filters={filters}
                />
            </PantryContext.Provider>
        </FiltersContext.Provider>
    )
    wrapper.find('input').simulate('change', { target: { value }})
    expect(mockFiltersDispatch).toHaveBeenLastCalledWith({ text: value, type: 'SET_TEXT_FILTER' })
})