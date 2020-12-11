import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { FirebaseProvider } from '../../context/firebase-context'
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from '../routers/PrivateRoute';
import PublicRoute from '../routers/PublicRoute';
import SpecialUserRoute from './SpecialUserRoute'
import IngredientsPage from '../components/IngredientsPage';
import HomePage from '../components/HomePage';
import { IngredientsProvider } from '../../context/ingredients-context';
import { RecipesProvider } from '../../context/recipes-context';
import { FiltersProvider } from '../../context/filters-context';
import AppWrapper from '../components/AppWrapper'

export const history = createHistory();

const AppRouter = () => (
    <FirebaseProvider >
        <RecipesProvider>
            <IngredientsProvider>
                <FiltersProvider>
                    <Router history={history}>
                        <div>
                            <AppWrapper>
                                <Switch>
                                    <PublicRoute path='/' component={LoginPage} exact={true}/>
                                    <PrivateRoute path='/home' component={HomePage} />
                                    <SpecialUserRoute path='/ingredients' component={IngredientsPage} />
                                    <Route component={NotFoundPage}/>
                                </Switch>
                            </AppWrapper>
                        </div>
                    </Router>
                </FiltersProvider>
            </IngredientsProvider>
        </RecipesProvider>
    </FirebaseProvider>
)

export default AppRouter;