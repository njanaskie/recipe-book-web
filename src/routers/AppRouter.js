import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { FirebaseProvider } from '../../context/firebase-context'
import DashboardPage from '../components/Dashboard/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from '../routers/PrivateRoute';
import PublicRoute from '../routers/PublicRoute';
import SpecialUserRoute from './SpecialUserRoute'
import IngredientsPage from '../components/Ingredients/IngredientsPage';
import PantryPage from '../components/Pantry/PantryPage'
import AddDishPage from '../components/Dishes/AddDishPage'
import DishesPage from '../components/Dishes/DishesPage'
import DishDetailPage from '../components/Dishes/DishDetails/DishDetailPage';
import EditDishPage from '../components/Dishes/EditDishPage'
import HomePageContext from '../components/HomePageContext'
import HomePage from '../components/HomePage';
import AddRecipeContext from '../components/AddRecipeContext';
import AddRecipe from '../components/AddRecipe';
import EditRecipeContext from '../components/EditRecipeContext'
import EditRecipe from '../components/EditRecipe';
import { IngredientsProvider } from '../../context/ingredients-context';
import { RecipesProvider } from '../../context/recipes-context';
import { FiltersProvider } from '../../context/filters-context';
import AppShell from '../components/AppShell'

export const history = createHistory();


// <PrivateRoute path='/dashboard' component={DashboardPage} />
// <PrivateRoute path='/pantry' component={PantryPage} />
// <SpecialUserRoute path='/dishes' component={DishesPage} />
// <PrivateRoute path='/dish/:id' component={DishDetailPage} />
// <SpecialUserRoute path='/add-dish' component={AddDishPage} />

const AppRouter = () => (
    <FirebaseProvider >
        <IngredientsProvider>
            <RecipesProvider>
                <FiltersProvider>
                    <Router history={history}>
                        <div>
                            <AppShell>
                                <Switch>
                                    <PublicRoute path='/' component={LoginPage} exact={true}/>
                                    <PrivateRoute path='/home' component={HomePage} />
                                    <SpecialUserRoute path='/ingredients' component={IngredientsPage} />
                                    <SpecialUserRoute path='/edit-recipe/:id' component={EditRecipe} />
                                    <Route component={NotFoundPage}/>
                                </Switch>
                            </AppShell>
                        </div>
                    </Router>
                </FiltersProvider>
            </RecipesProvider>
        </IngredientsProvider>
    </FirebaseProvider>
)

export default AppRouter;