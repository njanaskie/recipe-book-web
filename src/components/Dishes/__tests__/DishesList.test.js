import React from 'react'
import { shallow, mount } from 'enzyme'
import { DishesList } from '../DishesList'
import dishes from '../../../tests/fixtures/dishes'
import * as AllIngredientsContext from '../../../../context/ingredients-context'
import IngredientsContext from '../../../../context/ingredients-context'
import * as AllPantryContext from '../../../../context/pantry-context'
import PantryContext from '../../../../context/pantry-context'
import * as AllFirebaseContext from '../../../../context/firebase-context'
import FirebaseContext from '../../../../context/firebase-context'
import DishesContext from '../../../../context/dishes-context'
import * as AllDishesContext from '../../../../context/dishes-context'
import user from '../../../tests/fixtures/user'

const mockUseEffect = () => {
    jest.spyOn(React, "useEffect").mockImplementationOnce(f => f());
  };

// let userSpy, pantryIngredientsSpy

// beforeEach(() => {
//     userSpy = jest.spyOn(AllFirebaseContext, 'useFirebaseContext').mockImplementation(() => user)
//     pantryIngredientsSpy = jest.spyOn(AllPantryContext, 'usePantryContext').mockImplementation(() => [])
// })

// afterEach(() => {
//     userSpy.mockRestore()
//     pantryIngredientsSpy.mockRestore()
// })

test('should render DishesList with dishes', () => {
    mockUseEffect()
    jest.spyOn(AllDishesContext, 'useDishesContext').mockImplementation(() => {dishes})
    const wrapper = shallow(
        // <DishesContext.Provider value={dishes}>
            <DishesList dishes={dishes}/>
        // </DishesContext.Provider>
    )
    expect(wrapper).toMatchSnapshot()
})

// test('should render IngredientsList with empty message',() => {
//     jest.spyOn(AllIngredientsContext, 'useIngredientsContext').mockImplementation(() => [])
//     const wrapper = shallow(
//         <IngredientsContext.Provider value={{ ingredients }}>
//             <PantryContext.Provider value={{ pantryIngredients: pantryIngredientsSpy }}>
//                 <IngredientsList ingredients={[]}/>
//             </PantryContext.Provider>
//         </IngredientsContext.Provider>
//     ).dive().dive()
//     expect(wrapper).toMatchSnapshot()
// });