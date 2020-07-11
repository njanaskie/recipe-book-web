import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useFirebaseContext } from '../../context/firebase-context'

export const SubHeader = () => {
    const { isAdmin } = useFirebaseContext()

    return (
        <header>
            <NavLink to='/dashboard' activeClassName='is-active'>Dashboard</NavLink>
            <NavLink to='/pantry' activeClassName='is-active'>Pantry</NavLink>
            {isAdmin && <NavLink to='/ingredients' activeClassName='is-active'>Ingredients</NavLink>}
            {isAdmin && <NavLink to='/dishes' activeClassName='is-active'>Dishes</NavLink>}
            {isAdmin && <NavLink to='/add-dish' activeClassName='is-active'>Add Dish</NavLink>}
        </header>
    )
}

export default SubHeader;