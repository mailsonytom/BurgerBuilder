import { updatedObject } from '../Utility';


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.types) {
        case 'AUTH_START':
            return updatedObject(state, {
                error: null, loading: true
            });
        case 'AUTH_SUCCESS':
            return updatedObject(state, {
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false
            })
        case 'AUTH_FAIL':
            return updatedObject(state, {
                error: action.error,
                loading: false
            })
        default:
            return state
    }
}

export default reducer;