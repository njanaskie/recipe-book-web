import React from 'react';
import { firebase, isInitialized } from '../firebase/firebase'
import AppRouter from '../routers/AppRouter'
import LoadingPage from '../components/LoadingPage'
import { FirebaseProvider, useFirebaseContext } from '../../context/firebase-context'
import { IngredientsProvider } from '../../context/ingredients-context';
import { RecipesProvider } from '../../context/recipes-context';
import { FiltersProvider } from '../../context/filters-context';
import AppWrapper from '../components/AppWrapper';

const App = () => {

    return (
        <FirebaseProvider >
            <RecipesProvider>
                <IngredientsProvider>
                    <FiltersProvider>
                        <AppWrapper>
                            <AppRouter />
                        </AppWrapper>
                    </FiltersProvider>
                </IngredientsProvider>
            </RecipesProvider>
        </FirebaseProvider>
    )
    
}

export default App;