import React from 'react';
import { NavLink } from 'react-router-dom';

const SubHeader = () => (
    <header>
        <NavLink to='/dashboard' activeClassName='is-active'>Dashboard</NavLink>
        <NavLink to='/pantry' activeClassName='is-active'>Pantry</NavLink>
        <NavLink to='/ingredients' activeClassName='is-active'>Ingredients</NavLink>
    </header>
)

export default SubHeader;