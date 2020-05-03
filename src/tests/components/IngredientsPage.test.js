import React from 'react'
import { shallow, mount } from 'enzyme'
import IngredientsPage from '../../components/Ingredients/IngredientsPage'
import ingredients from '../fixtures/ingredients'
import IngredientsContext from '../../../context/ingredients-context'

test('should render IngredientsPage correctly',() => {
    const wrapper = shallow(
        <IngredientsPage />)
    expect(wrapper).toMatchSnapshot()
});