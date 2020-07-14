import React from 'react'
import { shallow } from 'enzyme'
import { DashboardList } from '../DashboardList'
import * as FiltersContext from '../../../../context/filters-context'
import * as DishesContext from '../../../../context/dishes-context'
import { filters } from '../../../tests/fixtures/filters'
import dishes from '../../../tests/fixtures/dishes'

let dishesSpy, filtersSpy;

beforeEach(() => {
    dishesSpy = jest.spyOn(DishesContext, 'useDishesContext')
    filtersSpy = jest.spyOn(FiltersContext, 'useFiltersContext')
})

afterEach(() => {
    dishesSpy.mockRestore()
    filtersSpy.mockRestore()
})

test('should render DashboardList with dishes',() => {
    dishesSpy.mockImplementation(() => (dishes))
    filtersSpy.mockImplementation(() => (filters))
    const wrapper = shallow(<DashboardList />)
    // expect(dishesSpy).toHaveBeenCalled()
    // expect(filtersSpy).toHaveBeenCalled()
    expect(wrapper).toMatchSnapshot()
});


// test('should render DashboardList with empty message',() => {
//     // jest.spyOn(FirebaseContext, 'useFirebaseContext').mockImplementation(() => ({isAdmin: true}))
//     const wrapper = shallow(<DashboardList />)
//     expect(wrapper).toMatchSnapshot()
// });
