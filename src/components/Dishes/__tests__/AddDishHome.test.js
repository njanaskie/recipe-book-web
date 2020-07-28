import React from 'react'
import { shallow, mount } from 'enzyme'
import { Router } from 'react-router-dom';
import * as router from 'react-router';
import ingredients from '../../../tests/fixtures/ingredients'
import { AddDishHome } from '../AddDishHome'
import DishesContext from '../../../../context/dishes-context'
import * as AllDishesContext from '../../../../context/dishes-context'
import IngredientsContext from '../../../../context/ingredients-context'

let mockDishDispatch, mockHistory;

// mockHistory = jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useHistory: () => ({
//       push: jest.fn()
//     })
//   }));
  
beforeEach(() => {
    mockDishDispatch = jest.fn()
    // mockHistory = { push: jest.fn() }
    mockHistory = { push: jest.fn(), location: {}, listen: jest.fn() };
    // mockHistory = jest.mock('react-router-dom', () => ({
    //     useHistory: () => ({
    //       push: jest.fn(),
    //       history: { listen: jest.fn() },
    //       location: {},
    //       listen: jest.fn()
    //     })
    //   }));

})

afterEach(() => {
    jest.clearAllMocks();
})


test('should render AddDishHome correctly',() => {
    jest.spyOn(AllDishesContext, 'useDishesContext').mockImplementation(() => mockDishDispatch)
    jest.spyOn(router, 'useHistory').mockImplementation(() => mockHistory);
    const wrapper = shallow(
        <Router history={mockHistory}>
            <DishesContext.Provider value={{ dishDispatch: mockDishDispatch }}>
                <IngredientsContext.Provider value={{ ingredients }}>
                    <AddDishHome />
                </IngredientsContext.Provider>
            </DishesContext.Provider>
        </Router>
    )
    // .find('AddDishHome').dive()
    expect(wrapper).toMatchSnapshot()
})

// test('should handle onSubmit',() => {
//     const wrapper = mount(
//         <Router history={mockHistory}>
//             <DishesContext.Provider value={{ dishDispatch: mockDishDispatch }}>
//                 <IngredientsContext.Provider value={{ ingredients }}>
//                     <AddDishHome />
//                 </IngredientsContext.Provider>
//             </DishesContext.Provider>
//         </Router>
//     )
//     wrapper.find('DishForm').prop('onSubmit')(ingredients[1])
//     expect(mockHistory.push).toHaveBeenLastCalledWith('/dishes')
//     // expect(startAddExpense).toHaveBeenLastCalledWith(ingredients[1])
// })