import React from 'react'
import { shallow } from 'enzyme'
import { IngredientsList } from '../IngredientsList'
import ingredients from '../../../tests/fixtures/ingredients'
import IngredientsContext from '../../../../context/ingredients-context'

test('should render IngredientsList correctly',() => {
    const wrapper = shallow(<IngredientsList />)
    expect(wrapper).toMatchSnapshot()
});

// test('should render IngredientsList with ingredients', () => {
//     const wrapper = shallow(
//         <IngredientsContext.Provider value={ingredients}>
//             <IngredientsList ingredients={ingredients}/>
//         </IngredientsContext.Provider >)
//     expect(wrapper).toMatchSnapshot()
// })

// test('should render IngredientsList with empty message', () => {
//     const wrapper = shallow(
//         <IngredientsContext.Provider value={[]}>
//             <IngredientsList ingredients={[]}/>
//         </IngredientsContext.Provider >)
//     expect(wrapper).toMatchSnapshot()
// })