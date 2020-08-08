import React from 'react'
import * as ReactRouter from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { BrowserRouter, Route, Router, useHistory, MemoryRouter } from 'react-router-dom';
import * as router from 'react-router';
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
import { history } from '../../../routers/AppRouter'
import ingredients from '../../../tests/fixtures/ingredients'
import { EditDishHome } from '../EditDishHome'
import DishesContext from '../../../../context/dishes-context'
import * as AllDishesContext from '../../../../context/dishes-context'
import IngredientsContext from '../../../../context/ingredients-context'
import dishes from '../../../tests/fixtures/dishes'

let mockDishDispatch, mockHistory, useHistoryMock, mockOnRemove;
  
beforeEach(() => {
    mockDishDispatch = jest.fn()
    mockHistory = { push: jest.fn(), location: {}, listen: jest.fn() };
    mockOnRemove = jest.fn()

})

afterEach(() => {
    // jest.clearAllMocks();
    jest.restoreAllMocks();
})

test('should render EditDishHome correctly', async () => {
    const wrapper = await mount(
        <Router history={mockHistory}>
            <DishesContext.Provider value={{ dishes, dishDispatch: mockDishDispatch }}>
                <IngredientsContext.Provider value={{ ingredients }}>
                    <EditDishHome dishes={dishes}/>
                </IngredientsContext.Provider>
            </DishesContext.Provider>
        </Router>
    ).find('EditDishHome')
    expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
    const wrapper = shallow(
        <Router history={mockHistory}>
            <DishesContext.Provider value={{ dishes, dishDispatch: mockDishDispatch }}>
                <IngredientsContext.Provider value={{ ingredients }}>
                    <EditDishHome onSubmit={mockDishDispatch}/>
                </IngredientsContext.Provider>
            </DishesContext.Provider>
        </Router>
    ).find('EditDishHome')
    wrapper.prop('onSubmit')(dishes[0])
    // expect(mockHistory.push).toHaveBeenLastCalledWith('/dishes')
    expect(mockDishDispatch).toHaveBeenLastCalledWith(dishes[0])
})

// test('should handle remove dish', () => {
//     jest.spyOn(AllDishesContext, 'useDishesContext').mockImplementation(() => mockOnRemove)
//     jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: 2 });
//     const wrapper = shallow(
//         <Router history={mockHistory}>
//             <DishesContext.Provider value={{ dishes, dishDispatch: mockOnRemove }}>
//                 <IngredientsContext.Provider value={{ ingredients }}>
//                     <EditDishHome dish={dishes[1]} onRemove={mockOnRemove} />
//                 </IngredientsContext.Provider>
//             </DishesContext.Provider>
//         </Router>
//     ).find('EditDishHome').dive()
//     wrapper.find('button').simulate('click')
//     // wrapper.prop('onRemove')
//     // expect(mockHistory.push).toHaveBeenLastCalledWith('/dishes')
//     expect(mockOnRemove).toHaveBeenLastCalledWith({ id: dishes[1].id })
// })