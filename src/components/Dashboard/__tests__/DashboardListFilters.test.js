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

afterEach(() => {
    setTextFilter.mockRestore()
    setKeyIngredientFilter.mockRestore()
    setCuisineFilter.mockRestore()
    setTypeFilter.mockRestore()
    mockFiltersDispatch.mockRestore()
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
                />
            </PantryContext.Provider>
        </FiltersContext.Provider>
    )
    wrapper.find('input').simulate('change', { target: { value }})
    expect(mockFiltersDispatch).toHaveBeenLastCalledWith({ text: value, type: 'SET_TEXT_FILTER' })
})

test('should handle key ingredient change', () => {
    const value = 'salt'
    const wrapper = mount(
        <FiltersContext.Provider value={{ filters, filtersDispatch: setKeyIngredientFilter }}>
            <PantryContext.Provider value={{ pantryIngredients: ingredients }}>
                <DashboardListFilters
                />
            </PantryContext.Provider>
        </FiltersContext.Provider>
    )
    wrapper.find('Dropdown').at(0).prop('onChange')({ target: { value }});
    expect(setKeyIngredientFilter).toHaveBeenCalledWith({ keyIngredients: value, type: 'SET_KEY_INGREDIENT_FILTER' })
})

test('should handle cuisine change', () => {
    const value = 'mexican'
    const wrapper = mount(
        <FiltersContext.Provider value={{ filters, filtersDispatch: setCuisineFilter }}>
            <PantryContext.Provider value={{ pantryIngredients: ingredients }}>
                <DashboardListFilters
                />
            </PantryContext.Provider>
        </FiltersContext.Provider>
    )
    wrapper.find('Dropdown').at(1).prop('onChange')({ target: { value }});
    expect(setCuisineFilter).toHaveBeenCalledWith({ cuisine: value, type: 'SET_CUISINE_FILTER' })
})

test('should handle type change', () => {
    const value = 'dinner'
    const wrapper = mount(
        <FiltersContext.Provider value={{ filters, filtersDispatch: setTypeFilter }}>
            <PantryContext.Provider value={{ pantryIngredients: ingredients }}>
                <DashboardListFilters
                />
            </PantryContext.Provider>
        </FiltersContext.Provider>
    )
    wrapper.find('Dropdown').at(2).prop('onChange')({ target: { value }});
    expect(setTypeFilter).toHaveBeenCalledWith({ dishType: value, type: 'SET_TYPE_FILTER' })
})