import React from 'react'
import { shallow } from 'enzyme'
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

// test('should render AddIngredientForm with ingredient data',() => {
//     const value = ingredients[1]
//     const wrapper = shallow(
//         <IngredientsContext.Provider value={value}>
//             <AddIngredientForm {...value}/>
//         </IngredientsContext.Provider >).dive()
//     expect(wrapper.find('input').text()).toBe('Lettuce')
// });