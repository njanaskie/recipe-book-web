import React from 'react'
import { shallow } from 'enzyme'
import IngredientListItem from '../../components/Ingredients/IngredientListItem'
import ingredients from '../fixtures/ingredients'

test('should render IngredientListItem with ingredient',() => {
    const wrapper = shallow(<IngredientListItem {...ingredients[2]}/>)
    expect(wrapper).toMatchSnapshot()
});