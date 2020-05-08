// Pantry Reducer

const pantryReducerDefaultState = [];

const pantryReducer = (state = pantryReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_PANTRY_INGREDIENT':
            return [
                ...state,
                action.pantryIngredient
            ];
        case 'REMOVE_PANTRY_INGREDIENT':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_PANTRY_INGREDIENT':
            return state.map((pantryIngredient) => {
                if (pantryIngredient.id === action.id) {
                    return {
                        ...pantryIngredient,
                        ...action.updates
                    };
                } else {
                    return pantryIngredient;
                };
            });
        case 'SET_PANTRY_INGREDIENTS':
            return action.pantryIngredients;
        default:
            return state;
    }
}

export default pantryReducer;