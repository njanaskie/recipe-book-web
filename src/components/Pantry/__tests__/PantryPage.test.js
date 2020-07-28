import React from 'react'
import { shallow } from 'enzyme'
import PantryPage from '../PantryPage'

test('should render PantryPage correctly',() => {
    const wrapper = shallow(<PantryPage />)
    expect(wrapper).toMatchSnapshot()
})