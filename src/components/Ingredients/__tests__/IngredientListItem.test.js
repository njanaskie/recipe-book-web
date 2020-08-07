import React from 'react'
import IngredientsContext from '../../../../context/ingredients-context'
import { shallow } from 'enzyme'
import IngredientListItem from '../IngredientListItem'
import ingredients from '../../../tests/fixtures/ingredients'
import user from '../../../tests/fixtures/user'
import * as AllFirebaseContext from '../../../../context/firebase-context'
import * as AllIngredientsContext from '../../../../context/ingredients-context'
import * as AllPantryContext from '../../../../context/pantry-context'


test('should render IngredientListItem with ingredient in pantry',() => {
    const ingDispatchMock = jest.fn()
    jest.spyOn(AllFirebaseContext, 'useFirebaseContext').mockImplementation(() => 123)
    jest.spyOn(AllIngredientsContext, 'useIngredientsContext').mockImplementation(() => ingDispatchMock)
    jest.spyOn(AllPantryContext, 'usePantryContext').mockImplementation(() => ingredients)
    const wrapper = shallow(
            <IngredientListItem ingredient={ingredients[2]}/>
        )
    expect(wrapper).toMatchSnapshot()
});

// test('should render IngredientListItem with ingredient not in pantry',() => {
//     const nonPantryIng = {
//         id: 4,
//         name: 'Muffin',
//         category: 'Bread',
//         price: 1
//     }
//     const ingDispatchMock = jest.fn()
//     jest.spyOn(AllFirebaseContext, 'useFirebaseContext').mockImplementation(() => 123)
//     jest.spyOn(AllIngredientsContext, 'useIngredientsContext').mockImplementation(() => ingDispatchMock)
//     jest.spyOn(AllPantryContext, 'usePantryContext').mockImplementation(() => ingredients)
//     const wrapper = shallow(
//             <IngredientListItem ingredient={nonPantryIng}/>
//         )
//     expect(wrapper).toMatchSnapshot()
// });