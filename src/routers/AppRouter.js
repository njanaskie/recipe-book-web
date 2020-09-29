import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { FirebaseProvider } from '../../context/firebase-context'
import DashboardPage from '../components/Dashboard/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from '../routers/PrivateRoute';
import PublicRoute from '../routers/PublicRoute';
import AdminRoute from './AdminRoute'
import IngredientsPage from '../components/Ingredients/IngredientsPage';
import PantryPage from '../components/Pantry/PantryPage'
import AddDishPage from '../components/Dishes/AddDishPage'
import DishesPage from '../components/Dishes/DishesPage'
import DishDetailPage from '../components/Dishes/DishDetails/DishDetailPage';
import EditDishPage from '../components/Dishes/EditDishPage'
import HomePage from '../components/HomePage'
import AddRecipeContext from '../components/AddRecipeContext';
import EditRecipeContext from '../components/EditRecipeContext'

export const history = createHistory();


// <PrivateRoute path='/dashboard' component={DashboardPage} />
// <PrivateRoute path='/pantry' component={PantryPage} />
// <AdminRoute path='/dishes' component={DishesPage} />
// <PrivateRoute path='/dish/:id' component={DishDetailPage} />
// <AdminRoute path='/add-dish' component={AddDishPage} />

const AppRouter = () => (
    <FirebaseProvider >
        <Router history={history}>
            <div>
                <Switch>
                    <PublicRoute path='/' component={LoginPage} exact={true}/>
                    <PrivateRoute path='/home' component={HomePage} />
                    <PrivateRoute path='/add-recipe' component={AddRecipeContext} />
                    <AdminRoute path='/ingredients' component={IngredientsPage} />
                    <AdminRoute path='/edit-recipe/:id' component={EditRecipeContext} />
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        </Router>
    </FirebaseProvider>
)

export default AppRouter;