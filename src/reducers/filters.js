
// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    keyIngredients: [],
    cuisine: '',
    dishType: '',
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
        case 'SET_CUISINE_FILTER':
            return {
                ...state,
                cuisine: action.cuisine
            }
        case 'SET_TYPE_FILTER':
            return {
                ...state,
                dishType: action.dishType
            }
        default:
            return state;
        }
    }
    
    export default filtersReducer;