import React from 'react'
import { shallow, mount } from 'enzyme'
import { BrowserRouter, Route, Router, useHistory, MemoryRouter } from 'react-router-dom';
import * as router from 'react-router';
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
import { history } from '../../../routers/AppRouter'
import ingredients from '../../../tests/fixtures/ingredients'
import { AddDishHome } from '../AddDishHome'
import DishesContext from '../../../../context/dishes-context'
import * as AllDishesContext from '../../../../context/dishes-context'
import IngredientsContext from '../../../../context/ingredients-context'
import dishes from '../../../tests/fixtures/dishes'

let mockDishDispatch, mockHistory, useHistoryMock;
  
beforeEach(() => {
    mockDishDispatch = jest.fn()
    // mockHistory = { push: jest.fn() }
    // useHistoryMock = jest.fn()
    mockHistory = { push: jest.fn(), location: {}, listen: jest.fn() };
    // mockHistory = jest.mock('react-router-dom', () => ({
    //     useHistory: () => ({
    //       push: jest.fn(),
    //       location: {},
    //       listen: jest.fn()
    //     })
    //   }));
    // mockHistory = jest.mock('react-router-dom', () => ({
    //     ...jest.requireActual('react-router-dom'),
    //     useHistory: () => ({
    //     push: jest.fn()
    //     })
    // }));

})

afterEach(() => {
    // jest.clearAllMocks();
    jest.restoreAllMocks();
})

// causes force exit warning
test('should render AddDishHome correctly', async () => {
    const wrapper = await mount(
        <Router history={mockHistory}>
            <DishesContext.Provider value={{ dishDispatch: mockDishDispatch }}>
                <IngredientsContext.Provider value={{ ingredients }}>
                    <AddDishHome />
                </IngredientsContext.Provider>
            </DishesContext.Provider>
        </Router>
    ).find('AddDishHome')
    expect(wrapper).toMatchSnapshot()
})

// consider creating dispatch actions
test('should handle onSubmit', () => {
    const wrapper = shallow(
        <Router history={mockHistory}>
            <DishesContext.Provider value={{ dishDispatch: mockDishDispatch }}>
                <IngredientsContext.Provider value={{ ingredients }}>
                    <AddDishHome onSubmit={mockDishDispatch}/>
                </IngredientsContext.Provider>
            </DishesContext.Provider>
        </Router>
    ).find('AddDishHome')
    wrapper.prop('onSubmit')(dishes[1])
    // expect(mockHistory.push).toHaveBeenLastCalledWith('/dishes')
    expect(mockDishDispatch).toHaveBeenLastCalledWith(dishes[1])
})