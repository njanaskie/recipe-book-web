import React from 'react'
import { shallow } from 'enzyme'
import DishesPage from '../DishesPage'

test('should render DishesPage correctly',() => {
    const wrapper = shallow(<DishesPage />)
    expect(wrapper).toMatchSnapshot()
})