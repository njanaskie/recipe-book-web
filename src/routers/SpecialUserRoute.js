import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader'
import SpecialUser from '../components/SpecialUser'
import FirebaseContext from '../../context/firebase-context'
import { useFiltersContext } from '../../context/filters-context';
import { useIngredientsContext } from '../../context/ingredients-context';
import { useRecipesContext } from '../../context/recipes-context';

export const AdminRoute = ({
    component: Component,
    ...rest
}) => {
    const { user, isAdmin, isGuest } = useContext(FirebaseContext)
    // const { filters, filtersDispatch } = useFiltersContext()
    // const { ingredients, dispatch } = useIngredientsContext()
    // const { recipes, recipeDispatch } = useRecipesContext()

    return (
        <Route {...rest} component={(props) => (
            ((!!isAdmin || !!isGuest) && !!user) ? (
                <div>
                    <Header />
                    <SpecialUser />
                    <Component {...props}/>
                </div>
            ) : (
                <Redirect to='/' />
            )
        )}/>
    )
    }

export default AdminRoute;