
// Dishes Reducer

const dishesReducerDefaultState = [];

const dishesReducer = (state = dishesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_DISH':
            return [
                ...state,
                action.dish
            ];
        case 'REMOVE_DISH':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_DISH':
            return state.map((dish) => {
                if (dish.id === action.id) {
                    return {
                        ...dish,
                        ...action.updates
                    };
                } else {
                    return dish;
                };
            });
        case 'SET_DISHES':
            return action.dishes;
        default:
            return state;
    }
}

export default dishesReducer;