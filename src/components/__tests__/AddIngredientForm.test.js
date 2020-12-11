import React from 'react'
import { shallow, mount } from 'enzyme'
import AddIngredientForm from '../AddIngredientForm'
import ingredients from '../../../tests/fixtures/ingredients'
import * as IngredientsContext from '../../../../context/ingredients-context'

let dispatch, setStateSpy, setName, setCategory, setPrice, setError, addIngredient;

beforeEach(() => {
    dispatch = jest.fn()
    setStateSpy = jest.spyOn(React, 'useState')
    setName = jest.fn()
    setCategory = jest.fn()
    setPrice = jest.fn()
    setError = jest.fn()
    addIngredient = jest.fn()
})

afterEach(() => {
    jest.clearAllMocks();
});

test('should render AddIngredientForm correctly',() => {
    jest.spyOn(IngredientsContext, 'useIngredientsContext').mockImplementation(() => dispatch)
    const wrapper = shallow(<AddIngredientForm />)
    expect(wrapper).toMatchSnapshot()
});

test('should render error message for invalid form submission', () => {
    const wrapper = shallow(<AddIngredientForm />)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    })
    expect(wrapper).toMatchSnapshot()
})

test('should set error for invalid form submission', () => {
    setStateSpy.mockImplementation((init) => [init, setError]);
    const wrapper = shallow(<AddIngredientForm />)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    })
    expect(setError).toHaveBeenCalled()
})

test('should set name on input change', () => {
    const value = 'New name'
    setStateSpy.mockImplementation((init) => [init, setName]);
    const wrapper = shallow(<AddIngredientForm />)
    wrapper.find('#set-name').props().onChange({ target: { value }});
    expect(setName).toHaveBeenLastCalledWith(value)
});

test('should set category on select change', () => {
    const value = 'New category'
    setStateSpy.mockImplementation((init) => [init, setCategory]);
    const wrapper = shallow(<AddIngredientForm />)
    wrapper.find('#set-category').props().onChange({ target: { value }});
    expect(setCategory).toHaveBeenCalledWith(value)
});

test('should set price on select change', () => {
    const value = 1
    setStateSpy.mockImplementation((init) => [init, setPrice]);
    const wrapper = shallow(<AddIngredientForm />)
    wrapper.find('#set-price').props().onChange({ target: { value }});
    expect(setPrice).toHaveBeenCalledWith(value)
});

// refactor to use one state, currently submitting without ingredient
test('should call onSubmit prop for valid form submission', () => {
    setStateSpy.mockImplementation((init) => [init, addIngredient]);
    const wrapper = shallow(<AddIngredientForm ingredient={ingredients[0]} onSubmit={addIngredient} />)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    })
    // expect(wrapper.state('error')).toBe('')
    // expect(addIngredient).toHaveBeenLastCalledWith({
    //     name: ingredients[0].name,
    //     category: ingredients[0].category,
    //     price: ingredients[0].price
    // })
    expect(addIngredient).toHaveBeenCalled()
})