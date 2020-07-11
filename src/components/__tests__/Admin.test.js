import React from 'react'
import { shallow } from 'enzyme'
import { Admin } from '../Admin'
import * as FirebaseContext from '../../../context/firebase-context'

test('should render Admin when admin exists',() => {
    jest.spyOn(FirebaseContext, 'useFirebaseContext').mockImplementation(() => ({isAdmin: true}))
    const wrapper = shallow(<Admin />)
    expect(wrapper).toMatchSnapshot()
});

test('should not render Admin when admin does not exist',() => {
    jest.spyOn(FirebaseContext, 'useFirebaseContext').mockImplementation(() => ({isAdmin: false}))
    const wrapper = shallow(<Admin />)
    expect(wrapper).toMatchSnapshot()
});