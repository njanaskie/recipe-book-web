import React from 'react'
import { shallow } from 'enzyme'
import DishesContext from '../../../../context/dishes-context'
import * as AllDishesContext from '../../../../context/dishes-context'
import DishListItem from '../DishListItem'
import dishes from '../../../tests/fixtures/dishes'

test('should render DishListItem with dish',() => {
    // jest.spyOn(AllDishesContext, 'useDishesContext').mockImplementation(() => dishes)
    const wrapper = shallow(
            <DishListItem dish={dishes[2]}/>
        )
    expect(wrapper).toMatchSnapshot()
});