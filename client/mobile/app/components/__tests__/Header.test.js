import React from 'react'
import { shallow, mount } from 'enzyme'
import { Header } from '../Header'

test('should render Header correctly',() => {
    const wrapper = shallow(<Header startLogout={() => { }}/>)
    expect(wrapper).toMatchSnapshot()
});

test('should call signOut on button click', () => {
    const startLogoutSpy = jest.fn()
    const wrapper = shallow(<Header startLogout={startLogoutSpy} />)
    wrapper.find('button').simulate('click')
    expect(startLogoutSpy).toHaveBeenCalled();
});