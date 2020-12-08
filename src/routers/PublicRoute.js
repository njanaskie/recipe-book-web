import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import FirebaseContext from '../../context/firebase-context'
import { useFiltersContext } from '../../context/filters-context';
import { useIngredientsContext } from '../../context/ingredients-context';
import { useRecipesContext } from '../../context/recipes-context';

export const PublicRoute = ({
    component: Component,
    ...rest
}) => {
    const { user } = useContext(FirebaseContext)
    // const { filters, filtersDispatch } = useFiltersContext()
    // const { ingredients, dispatch } = useIngredientsContext()
    // const { recipes, recipeDispatch } = useRecipesContext()

    return (
        <Route {...rest} component={(props) => (
            !!user ? (
                <Redirect to='/home' />
            ) : (
                <Component {...props}/>
            )
        )}/>
    )
}

export default PublicRoute;