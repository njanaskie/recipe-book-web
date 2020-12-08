import React from 'react';
import Header from '../components/Header'
import useAllRecipes from '../hooks/useAllRecipes'
import useIngredients from '../hooks/useIngredients'

const AppShell = (props) => {
    const recipes = useAllRecipes()
    const ingredients = useIngredients()

    return (
        <div>
            {props.children}
        </div>
    );
}

export default AppShell;