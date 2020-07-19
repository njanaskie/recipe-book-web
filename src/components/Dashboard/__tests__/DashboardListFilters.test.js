import React from 'react'
import { shallow, mount } from 'enzyme'
import { DashboardListFilters } from '../DashboardListFilters'
import * as AllFiltersContext from '../../../../context/filters-context'
import FiltersContext, { useFiltersContext } from '../../../../context/filters-context'
import { filters } from '../../../tests/fixtures/filters'

let setTextFilter, setKeyIngredientFilter, setCuisineFilter, setTypeFilter, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn()
    setKeyIngredientFilter = jest.fn()
    setCuisineFilter = jest.fn()
    setTypeFilter = jest.fn()
    jest.spyOn(AllFiltersContext, 'useFiltersContext').mockImplementation(() => filters)
    // wrapper = shallow(<DashboardListFilters />, { context: filters }).shallow()
    wrapper = mount(
        <FiltersContext.Provider value={filters}>
            <DashboardListFilters
                filters={filters}
                setTextFilter={setTextFilter}
                setKeyIngredientFilter={setKeyIngredientFilter}
                setCuisineFilter={setCuisineFilter}
                setTypeFilter={setTypeFilter}
            />
        </FiltersContext.Provider>
    )
})

test('should render DashbaordListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
})