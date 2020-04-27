import React from 'react'
import { mount, shallow } from 'enzyme'
import AddIngredientForm from '../../components/Ingredients/AddIngredientForm'

test('should render AddIngredientForm correctly',() => {
    const wrapper = shallow(<AddIngredientForm />)
    expect(wrapper).toMatchSnapshot()
})

// test('should set name on input change', () => {
//     const value = 'New name'
//     const wrapper = shallow(<AddIngredientForm />)
//     wrapper.find('input').at(0).simulate('change', {
//         target: { value }
//     })
//     expect(wrapper.state('name')).toBe(value)
// })