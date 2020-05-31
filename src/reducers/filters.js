
// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    keyIngredients: [],
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SET_KEY_INGREDIENT_FILTER':
            return {
                ...state,
                keyIngredients: action.keyIngredients
            }
        default:
            return state;
        }
    }
    
    export default filtersReducer;