import React from 'react'
import { shallow } from 'enzyme'
import { DashboardList } from '../DashboardList'

test('should render DashboardList with dishes',() => {
    // jest.spyOn(FirebaseContext, 'useFirebaseContext').mockImplementation(() => ({isAdmin: true}))
    const wrapper = shallow(<DashboardList />)
    expect(wrapper).toMatchSnapshot()
});


test('should render DashboardList with empty message',() => {
    // jest.spyOn(FirebaseContext, 'useFirebaseContext').mockImplementation(() => ({isAdmin: true}))
    const wrapper = shallow(<DashboardList />)
    expect(wrapper).toMatchSnapshot()
});
