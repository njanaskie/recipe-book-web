import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import 'semantic-ui-css/semantic.min.css'
import 'react-multi-carousel/lib/styles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const store = configureStore()

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(jsx, document.getElementById('app'));
// ReactDOM.render(<LoadingPage />, document.getElementById('app'));


// const useAuthChange = () => {
//     const { user } = useContext(FirebaseContext)

//     if (user) {
//         if (history.location.pathname === '/') {
//             history.push('/dashboard')

//         return renderApp();
//         } 
//     } else {
//         // store.dispatch(logout());
//         history.push('/');

//         return renderApp();
//     }
// }

// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         // store.dispatch(login(user.uid));
//         renderApp();
//         // if (history.location.pathname === '/') {
//         //     history.push('/dashboard')
//         // }
//     } else {
//         // store.dispatch(logout());
//         renderApp();
//         // history.push('/');
//     }
// });



