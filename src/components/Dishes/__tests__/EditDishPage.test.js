import React from 'react'
import { shallow } from 'enzyme'
import EditDishPage from '../EditDishPage'

test('should render EditDishPage correctly',() => {
    const wrapper = shallow(<EditDishPage />)
    expect(wrapper).toMatchSnapshot()
})