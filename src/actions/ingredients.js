import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_INGREDIENT
export const addIngredient = (ingredient) => ({
    type: 'ADD_INGREDIENT',
    ingredient
});

export const startAddIngredient = (ingredientData = {}) => {
    return (dispatch) => {
        const {
            name = '',
            category = '',
            price = ''
        } = ingredientData;
        const ingredient = { name, category, price };

        return database.ref('ingredients').push(ingredient).then((ref) => {
            dispatch(addIngredient({
                id: ref.key,
                ...ingredient
            }));
        });
    };
};

// REMOVE_INGREDIENT
export const removeIngredient = ({ id } = {}) => ({
    type: 'REMOVE_INGREDIENT',
    id
});

export const startRemoveIngredient = ({ id } = {}) => {
    return (dispatch, getState) => {
        return database.ref(`ingredients/${id}`).remove().then(() => {
            dispatch(removeIngredient({ id }))
        });
    };
};

// EDIT_INGREDIENT
export const editIngredient = (id, updates) => ({
    type: 'EDIT_INGREDIENT',
    id,
    updates
});

export const startEditIngredient = (id, updates) => {
    return (dispatch, getState) => {
        return database.ref(`ingredients/${id}`).update(updates).then(() => {
            dispatch(editIngredient(id, updates))
        });
    }
}

// SET_INGREDIENTS
export const setIngredients = (ingredients) => ({
    type: 'SET_INGREDIENTS',
    ingredients
});

export const startSetIngredients = () => {
    return (dispatch, getState) => {
        return database.ref('ingredients')
        .once('value')
        .then((snapshot) => {
            const ingredients = [];

            snapshot.forEach((childSnapshot) => {
                ingredients.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setIngredients(ingredients))
        });
    };
};