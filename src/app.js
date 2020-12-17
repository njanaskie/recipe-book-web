import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { firebase } from '../src/firebase/firebase'
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'semantic-ui-css/semantic.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingPage from '../src/components/LoadingPage'
import { useFirebaseContext } from '../context/firebase-context'
import useAllRecipes from '../src/hooks/useAllRecipes'
import useIngredients from '../src/hooks/useIngredients'
import App from '../src/components/App'

ReactDOM.render(<App />, document.getElementById('app'));

// const store = configureStore()

// const jsx = (
//     <Provider store={store}>
//         <AppRouter />
//     </Provider>
// );

// let hasRendered = false;
// const renderApp = () => {
//     if (!hasRendered) {
//         ReactDOM.render(jsx, document.getElementById('app'));
//         hasRendered = true;
//     }
// };

// useEffect(() => {
//     const { user, logout } = useFirebaseContext()

//     const isLoggedIn = () => {
    
//         if (user) {
//             if (history.location.pathname === '/') {
//                 history.push('/home')
//                 useAllRecipes()
//                 useIngredients()
//                 renderApp();
//             } 
//         } else {
//             logout();
//             history.push('/');
//             renderApp();
//         }
//     };

//     isLoggedIn()

// }, [])



// ReactDOM.render(jsx, document.getElementById('app'));
// ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// // const authStateChange = () => {
//     // const { login, logout } = useFirebaseContext()
    
//     firebase.auth().onAuthStateChanged((user) => {

//         if (user) {
//             // store.login(user.uid);
//             // login()
//             renderApp();
//             // useAllRecipes()
//             // useIngredients()
//             if (history.location.pathname === '/') {
//                 history.push('/home')
//             }
//         } else {
//             // store.logout();
//             // logout()
//             renderApp();
//             history.push('/');
//         }
//     });

// }




