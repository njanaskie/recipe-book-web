import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader'
import Admin from '../components/Admin'
import useAdmin from '../hooks/useAdmin'
import FirebaseContext from '../../context/firebase-context'

export const AdminRoute = ({
    component: Component,
    ...rest
}) => {
    const { user, isAdmin } = useContext(FirebaseContext)
    // const isAdmin = useAdmin()

    return (
        <Route {...rest} component={(props) => (
            (!!isAdmin && !!user) ? (
                <div>
                    <Header />
                    <SubHeader />
                    <Admin />
                    <Component {...props}/>
                </div>
            ) : (
                <Redirect to='/' />
            )
        )}/>
    )
    }

export default AdminRoute;