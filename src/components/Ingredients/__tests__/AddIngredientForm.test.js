import React from 'react'
import { shallow, mount } from 'enzyme'
import AddIngredientForm from '../AddIngredientForm'
import ingredients from '../../../tests/fixtures/ingredients'
import * as IngredientsContext from '../../../../context/ingredients-context'

let dispatch

beforeEach(() => {
    dispatch = jest.fn()
})

test('should render AddIngredientForm correctly',() => {
    jest.spyOn(IngredientsContext, 'useIngredientsContext').mockImplementation(() => dispatch)
    const wrapper = shallow(<AddIngredientForm />)
    expect(wrapper).toMatchSnapshot()
});

test('should set name on input change', () => {
    const value = 'New name'
    jest.spyOn(React, "useState").mockImplementation((name) => [name=value, setName]);
    const wrapper = shallow(<AddIngredientForm />)
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    })
    // wrapper.find('input').at(0).prop('onChange')({ target: { value }});
    expect(wrapper.prop('onChange').state('name')).toBe(value)
    // expect(wrapper).toMatchSnapshot()
});