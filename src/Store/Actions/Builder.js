import axios from '../../axios';

export const addIngredient = (name) => {
    return {
        type: 'ADD_INGREDIENT',
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: 'REMOVE_INGREDIENT',
        ingredientName: name
    };
};

export const setIngredient = (ingredients) => {
    return {
        type: 'SET_INGREDIENT',
        ingredients: ingredients,
    };
};

export const fetchFailed = () => {
    return {
        type: 'FETCH_FAILED',
        error: true
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-d36b8.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredient(response.data));
            })
            .catch(error => {
                dispatch(fetchFailed());
            });
    }
}