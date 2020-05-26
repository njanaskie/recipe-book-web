import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth'
import ingredientsReducer from '../reducers/ingredients'
import pantryReducer from '../reducers/pantry'
import dishesReducer from '../reducers/dishes'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            ingredients: ingredientsReducer,
            pantry: pantryReducer,
            dishes: dishesReducer,
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store
}


