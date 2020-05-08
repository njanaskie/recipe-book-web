import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import { firebase, googleAuthProvider } from '../firebase/firebase';

export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Recipe App</h1>
            <p>Tag line for app</p>
            <button className="button" onClick={() => firebase.auth().signInWithPopup(googleAuthProvider)}>Login with Google</button>
        </div>
    </div>
)

// const mapDispatchToProps = (dispatch) => ({
//     startLogin: () => dispatch(startLogin())
// });

export default LoginPage;