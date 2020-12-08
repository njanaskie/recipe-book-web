import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader'
import FirebaseContext from '../../context/firebase-context'
import SpecialUserRoute from '../components/SpecialUser'
import { useFiltersContext } from '../../context/filters-context';
import { useIngredientsContext } from '../../context/ingredients-context';
import { useRecipesContext } from '../../context/recipes-context';

export const PrivateRoute = ({
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
                <div>
                    <Header />
                    <SpecialUserRoute />
                    <Component {...props}/>
                </div>
            ) : (
                <Redirect to='/' />
            )
        )}/>
    )
    }

export default PrivateRoute;