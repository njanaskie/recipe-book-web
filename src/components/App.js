import React from 'react';
import AppRouter from '../routers/AppRouter'
import { FirebaseProvider } from '../../context/firebase-context'
import { IngredientsProvider } from '../../context/ingredients-context';
import { RecipesProvider } from '../../context/recipes-context';
import { FiltersProvider } from '../../context/filters-context';
import AppWrapper from '../components/AppWrapper';
import { firebase } from '../firebase/firebase';

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