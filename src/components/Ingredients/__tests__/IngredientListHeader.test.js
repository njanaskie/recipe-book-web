import React from 'react'
import { shallow } from 'enzyme'
import IngredientListHeader from '../IngredientListHeader'
import ingredients from '../../../tests/fixtures/ingredients'

test('should render IngredientListHeader correctly',() => {
    const wrapper = shallow(<IngredientListHeader />)
    expect(wrapper).toMatchSnapshot()
});

// test('should render IngredientListHeader with category',() => {
//     const wrapper = shallow(<IngredientListHeader {...ingredients[0]}/>)
//     expect(wrapper).toMatchSnapshot()
// });