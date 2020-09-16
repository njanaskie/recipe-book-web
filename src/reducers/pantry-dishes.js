
// PantryDishes Reducer

const dishesReducerDefaultState = [];

const pantryDishesReducer = (state = dishesReducerDefaultState, action) => {
    switch (action.type) {
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