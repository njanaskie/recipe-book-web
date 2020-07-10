import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { firebase } from '../firebase/firebase';

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
                    <button className="button button__link" onClick={startLogout}>Logout</button>
                </div>
            </div>
        </header>
    )
};

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);