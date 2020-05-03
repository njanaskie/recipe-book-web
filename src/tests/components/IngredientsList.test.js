import React from 'react'
import { shallow } from 'enzyme'
import { IngredientsList } from '../../components/Ingredients/IngredientsList'
import ingredients from '../fixtures/ingredients'
import IngredientsContext from '../../../context/ingredients-context'

test('should render IngredientsList with ingredients', () => {
    const wrapper = shallow(
        <IngredientsContext.Provider value={ingredients}>
            <IngredientsList ingredients={ingredients}/>
        </IngredientsContext.Provider >)
    expect(wrapper).toMatchSnapshot()
})

test('should render IngredientsList with empty message', () => {
    const wrapper = shallow(
        <IngredientsContext.Provider value={[]}>
            <IngredientsList ingredients={[]}/>
        </IngredientsContext.Provider >)
    expect(wrapper).toMatchSnapshot()
})