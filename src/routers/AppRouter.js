import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { FirebaseProvider } from '../../context/firebase-context'
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from '../routers/PrivateRoute';
import PublicRoute from '../routers/PublicRoute';
import IngredientsPage from '../components/Ingredients/IngredientsPage';
import PantryPage from '../components/Pantry/PantryPage'

export const history = createHistory();

const AppRouter = () => (
    <FirebaseProvider >
        <Router history={history}>
            <div>
                <Switch>
                    <PublicRoute path='/' component={LoginPage} exact={true}/>
                    <PrivateRoute path='/dashboard' component={DashboardPage} />
                    <PrivateRoute path='/ingredients' component={IngredientsPage} />
                    <PrivateRoute path='/pantry' component={PantryPage} />
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        </Router>
    </FirebaseProvider>
)

export default AppRouter;