import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { firebase } from '../firebase/firebase';
import SubHeader from './SubHeader'

// export const signOut = () => firebase.auth().signOut()

export const Header = ({ startLogout }) => {
    
    // const signOut = () => firebase.auth().signOut()

    return (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <Link className="header__title" to='/dashboard' >
                        <h1>Recipe App</h1>
                    </Link>
                    <SubHeader />
                </div>
            </div>
        </header>
    )
};


export default Header;