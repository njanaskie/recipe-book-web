import React from 'react'
import { shallow, mount } from 'enzyme'
import isAdmin from '../../../../tests/fixtures/admin'
import { FirebaseContext } from '../../../../../context/firebase-context'
import DetailContent from '../DetailContent'

test('should render DetailContent correctly',() => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({isAdmin: true}))
    const wrapper = shallow(<DetailContent />)
    expect(wrapper).toMatchSnapshot()
});