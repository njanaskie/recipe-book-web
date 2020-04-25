import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
    const action = {
        type: 'LOGIN',
        uid: 'fiowefjklasdfl89'
    }
    const state = authReducer({}, action);
    expect(state.uid).toEqual(action.uid);
})

test('should clear uid for logout', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({ uid: 'anyting' }, action);
    expect(state).toEqual({});
})