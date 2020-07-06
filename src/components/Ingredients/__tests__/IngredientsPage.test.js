import React from 'react'
import { shallow, mount } from 'enzyme'
import IngredientsPage from '../IngredientsPage'
import { ReactTinyLink } from 'react-tiny-link'
import ingredients from '../../../tests/fixtures/ingredients'
import IngredientsContext from '../../../../context/ingredients-context'

test('should render IngredientsPage correctly',() => {
    const wrapper = shallow(<IngredientsPage />)
    expect(wrapper).toMatchSnapshot()
});