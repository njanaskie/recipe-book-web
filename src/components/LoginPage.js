import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import { useFirebaseContext } from '../../context/firebase-context'


export const LoginPage = ({ startLogin, startLoginAsGuest }) => {
    const { login, loginAsGuest } = useFirebaseContext()

    const handleLogin = () => {
        login()
    }

    const handleLoginAsGuest = () => {
        loginAsGuest()
    }
    
    return (
        <div className="box-layout">
            <div className="box-layout__box">
                <img className="logo__image" src="/images/app-logo.png" />
                <p className='box-layout__subtitle'>Save your favorite recipes</p>
                <div className='box-layout__button'>
                    <Button color='google plus' onClick={handleLogin}>Login with Google</Button>
                </div>
                <div className='box-layout__button'>
                    <Button onClick={handleLoginAsGuest}>Login as a Guest</Button>
                </div>
            </div>
        </div>
    )
}

// const mapDispatchToProps = (dispatch) => {
//     const email = process.env.GUEST_EMAIL
//     const password = process.env.GUEST_PASSWORD

//     return {
//         startLogin: () => dispatch(startLogin()),
//         startLoginAsGuest: () => dispatch(startLoginAsGuest(email, password))
//     }
// };

export default LoginPage;