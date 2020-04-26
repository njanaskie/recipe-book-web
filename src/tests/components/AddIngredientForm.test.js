import React from 'react'
import { shallow } from 'enzyme'
import AddIngredientForm from '../../components/Ingredients/AddIngredientForm'

test('should render AddIngredientForm correctly',() => {
    const wrapper = shallow(<AddIngredientForm />)
    expect(wrapper).toMatchSnapshot()
})