import * as ReactAll from 'react'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { DashboardList } from '../DashboardList'
import * as AllFiltersContext from '../../../../context/filters-context'
import FiltersContext, { useFiltersContext } from '../../../../context/filters-context'
import * as AllDishesContext from '../../../../context/dishes-context'
import DishesContext, { useDishesContext } from '../../../../context/dishes-context'
import * as AllFirebaseContext from '../../../../context/firebase-context'
import PantryContext from '../../../../context/pantry-context'
import { filters } from '../../../tests/fixtures/filters'
import dishes from '../../../tests/fixtures/dishes'

test('should render DashboardList with dishes',() => {
    const wrapper = shallow(
        <DishesContext.Provider value={dishes}>
            <FiltersContext.Provider value={filters}>
                <DashboardList dishes={dishes}/>
            </FiltersContext.Provider>
        </DishesContext.Provider>
        )
    expect(wrapper).toMatchSnapshot()
});


test('should render DashboardList with no dishes',() => {
    // jest.spyOn(AllFiltersContext, 'useFiltersContext').mockImplementation(() => filters)
    // jest.spyOn(AllDishesContext, 'useDishesContext').mockImplementation(() => dishes)
    const wrapper = shallow(
        <FiltersContext.Provider value={[]}>
            <DishesContext.Provider value={{}}>
                <DashboardList dishes={[]}/>
            </DishesContext.Provider>
        </FiltersContext.Provider>
        )
    expect(wrapper).toMatchSnapshot()
});
