
// PantryDishes Reducer

const dishesReducerDefaultState = [];

const pantryDishesReducer = (state = dishesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_PANTRY_DISH':
            return [
                ...state,
                action.pantryDish
            ];
        case 'REMOVE_PANTRY_DISH':
            return state.filter(({ id }) => id !== action.id);
        case 'SET_PANTRY_DISHES':
            return action.pantryDishes;
            // return {
            //     ...state,
            //     pantryDishes: action.pantryDishes
            // };
        default:
            return state;
    }
}

export default pantryDishesReducer;