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
    jest.spyOn(AllDishesContext, 'useDishesContext').mockImplementation(() => dishes)
    // mockUseEffect()
    const wrapper = shallow(
        <DishesContext.Provider value={dishes}>
            <DishesList dishes={dishes}/>
        </DishesContext.Provider>
    )
    expect(wrapper).toMatchSnapshot()
})

test('should render DishesList with no dishes', () => {
    jest.spyOn(AllDishesContext, 'useDishesContext').mockImplementation(() => [])
    // mockUseEffect()
    const wrapper = shallow(
        <DishesContext.Provider value={[]}>
            <DishesList dishes={[]}/>
        </DishesContext.Provider>
    )
    expect(wrapper).toMatchSnapshot()
})