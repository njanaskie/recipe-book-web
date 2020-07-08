import React from 'react'
import { shallow } from 'enzyme'
import { Header } from '../Header'

test('should render Header correctly',() => {
    const wrapper = shallow(<Header startLogout={() => { }}/>)
    expect(wrapper).toMatchSnapshot()
});

test('should call signOut on button click', () => {
    const wrapper = shallow(<Header />)
    const signOut = jest.spyOn(wrapper, 'signOut')
    wrapper.find('button').simulate('click')
    expect(signOut).toHaveBeenCalled();
});