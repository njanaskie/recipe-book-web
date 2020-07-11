import React from 'react'
import { shallow } from 'enzyme'
import { SubHeader } from '../SubHeader'
import * as FirebaseContext from '../../../context/firebase-context'

test('should render SubHeader when admin exists',() => {
    jest.spyOn(FirebaseContext, 'useFirebaseContext').mockImplementation(() => ({isAdmin: true}))
    const wrapper = shallow(<SubHeader />)
    expect(wrapper).toMatchSnapshot()
});

test('should render SubHeader when admin does not exist',() => {
    jest.spyOn(FirebaseContext, 'useFirebaseContext').mockImplementation(() => ({isAdmin: false}))
    const wrapper = shallow(<SubHeader />)
    expect(wrapper).toMatchSnapshot()
});