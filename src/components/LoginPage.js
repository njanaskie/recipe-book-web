import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import { startLogin, startLoginAsGuest } from '../actions/auth';

export const LoginPage = ({ startLogin, startLoginAsGuest }) => {
    
    return (
        <div className="box-layout">
            <div className="box-layout__box">
                <img className="logo__image" src="/images/app-logo.png" />
                <p className='box-layout__subtitle'>Save your favorite recipes</p>
                <div className='box-layout__button'>
                    <Button color='google plus' onClick={startLogin}>Login with Google</Button>
                </div>
                <div className='box-layout__button'>
                    <Button onClick={startLoginAsGuest}>Login as a Guest</Button>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    const email = 'guest@gmail.com'
    const password = 'guest1'

    return {
        startLogin: () => dispatch(startLogin()),
        startLoginAsGuest: () => dispatch(startLoginAsGuest(email, password))
    }
};

export default connect(undefined, mapDispatchToProps)(LoginPage);