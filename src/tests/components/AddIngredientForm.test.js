import React from 'react'
import { shallow } from 'enzyme'
import AddIngredientForm from '../../components/Ingredients/AddIngredientForm'
import ingredients from '../fixtures/ingredients'
import IngredientsContext from '../../../context/ingredients-context'

test('should render AddIngredientForm correctly',() => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ingredients)
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