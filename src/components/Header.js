import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react'
import { startLogout } from '../actions/auth';
import { firebase } from '../firebase/firebase';
import SubHeaderContext from './SubHeaderContext'

// export const signOut = () => firebase.auth().signOut()

export const Header = ({ startLogout }) => {
    
    // const signOut = () => firebase.auth().signOut()

    return (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <Link className="header__title" to='/home' >
                        <h1>Recipe Book</h1>
                    </Link>
                    <SubHeaderContext />
                </div>
            </div>
        </header>
    )
};


export default Header;