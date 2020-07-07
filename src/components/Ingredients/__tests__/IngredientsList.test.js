import React from 'react'
import { shallow } from 'enzyme'
import { IngredientsList } from '../IngredientsList'
import ingredients from '../../../tests/fixtures/ingredients'
import * as IngredientsContext from '../../../../context/ingredients-context'
import * as FirebaseContext from '../../../../context/firebase-context'
import * as PantryContext from '../../../../context/pantry-context'

let user, pantryIngredients

beforeEach(() => {
    user = jest.spyOn(FirebaseContext, 'useFirebaseContext').mockImplementation(() => user)
    pantryIngredients = jest.spyOn(PantryContext, 'usePantryContext').mockImplementation(() => pantryIngredients)
})

afterEach(() => {
    user.mockRestore()
    pantryIngredients.mockRestore()
})

test('should render IngredientsList with ingredients',() => {
    jest.spyOn(IngredientsContext, 'useIngredientsContext').mockImplementation(() => ingredients)
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