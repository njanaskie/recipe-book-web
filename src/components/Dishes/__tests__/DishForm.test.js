import React from 'react'
import { shallow, mount } from 'enzyme'
import DishForm from '../DishForm'
import * as AllDishesContext from '../../../../context/dishes-context'
import * as AllIngredientsContext from '../../../../context/ingredients-context'
import ingredients from '../../../tests/fixtures/ingredients'

let dishDispatchMock;

beforeEach(() => {
    dishDispatchMock = jest.fn()
})

test('should render DishForm correctly',() => {
    jest.spyOn(AllDishesContext, 'useDishesContext').mockImplementation(() => dishDispatchMock)
    jest.spyOn(AllIngredientsContext, 'useIngredientsContext').mockImplementation(() => ingredients)
    const wrapper = shallow(<DishForm ingredients={ingredients}/>)
    expect(wrapper).toMatchSnapshot()
});