import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <img className="logo__image" src="/images/app-logo.png" />
            <p className='box-layout__subtitle'>Save your favorite recipes</p>
            <div className='box-layout__button'>
                <Button color='google plus' onClick={startLogin}>Login with Google</Button>
            </div>
        </div>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);