import React from 'react'
import { shallow, mount } from 'enzyme'
import { IngredientsList } from '../IngredientsList'
import ingredients from '../../../tests/fixtures/ingredients'
import * as AllIngredientsContext from '../../../context/ingredients-context'
import IngredientsContext from '../../../context/ingredients-context'
import * as AllPantryContext from '../../../context/pantry-context'
import PantryContext from '../../../context/pantry-context'
import * as AllFirebaseContext from '../../../context/firebase-context'
import FirebaseContext from '../../../context/firebase-context'
import user from '../../../tests/fixtures/user'

let userSpy, pantryIngredientsSpy

beforeEach(() => {
    userSpy = jest.spyOn(AllFirebaseContext, 'useFirebaseContext').mockImplementation(() => user)
    pantryIngredientsSpy = jest.spyOn(AllPantryContext, 'usePantryContext').mockImplementation(() => [])
})

afterEach(() => {
    userSpy.mockRestore()
    pantryIngredientsSpy.mockRestore()
})

test('should render IngredientsList with ingredients', () => {
    const wrapper = shallow(
        <IngredientsContext.Provider value={ingredients}>
            <IngredientsList ingredients={ingredients}/>
        </IngredientsContext.Provider>
    )
    expect(wrapper).toMatchSnapshot()
})

test('should render IngredientsList with empty message',() => {
    jest.spyOn(AllIngredientsContext, 'useIngredientsContext').mockImplementation(() => [])
    const wrapper = shallow(
        <IngredientsContext.Provider value={{ ingredients }}>
            <PantryContext.Provider value={{ pantryIngredients: pantryIngredientsSpy }}>
                <IngredientsList ingredients={[]}/>
            </PantryContext.Provider>
        </IngredientsContext.Provider>
    ).dive().dive()
    expect(wrapper).toMatchSnapshot()
});

// test('should render IngredientsList with ingredients2',() => {
//     jest.spyOn(AllIngredientsContext, 'useIngredientsContext').mockImplementation(() => ingredients)
//     const wrapper = mount(
//         <IngredientsContext.Provider value={{ ingredients }}>
//             <PantryContext.Provider value={{ pantryIngredients: pantryIngredientsSpy }}>
//                 <FirebaseContext.Provider value={{ user: userSpy }}>
//                     <IngredientsList ingredients={ingredients}/>
//                 </FirebaseContext.Provider>
//             </PantryContext.Provider>
//         </IngredientsContext.Provider>, { context: ingredients }
//     ).dive().dive().dive()
//     expect(wrapper).toMatchSnapshot()
// });