import React from 'react';
import { View } from 'react-native'
// import AppRouter from '../routers/AppRouter'
import { FirebaseProvider } from '../context/firebase-context'
import { IngredientsProvider } from '../context/ingredients-context';
import { RecipesProvider } from '../context/recipes-context';
// import { FiltersProvider } from '../context/filters-context';
// // import AppWrapper from './AppWrapper_old';

const AppWrapper = (props) => {

    return (
        <FirebaseProvider >
            <RecipesProvider>
                <IngredientsProvider>
                    {props.children}
                </IngredientsProvider>
            </RecipesProvider>
        </FirebaseProvider>
    )
    
}

export default AppWrapper;