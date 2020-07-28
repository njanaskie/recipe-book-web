import React from 'react'
import { shallow } from 'enzyme'
import AddDishPage from '../AddDishPage'

test('should render AddDishPage correctly',() => {
    const wrapper = shallow(<AddDishPage />)
    expect(wrapper).toMatchSnapshot()
})