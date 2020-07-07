import React from 'react'
import { shallow, mount } from 'enzyme'
import DetailContent from '../DetailContent'
import isAdmin from '../../../../tests/fixtures/admin'
import * as FirebaseContext from '../../../../../context/firebase-context'
import * as RecipesContext from '../../../../../context/recipes-context'


test('should render DetailContent correctly',() => {
    jest.spyOn(FirebaseContext, 'useFirebaseContext').mockImplementation(() => ({isAdmin: true}))
    const wrapper = shallow(<DetailContent />)
    expect(wrapper).toMatchSnapshot()
});