import { updatedObject } from '../Utility';


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state, action) => {
    return updatedObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updatedObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false
    });;
}

const authLogout = (state, action) => {
    return updatedObject(state, {
        token: null,
        userId: null
    });
}

const reducer = (state = initialState, action) => {
    switch (action.types) {
        case 'AUTH_START': return authStart(state, action);
        case 'AUTH_SUCCESS': return authSuccess(state, action);
        case 'AUTH_FAIL': return authFail(state, action);
        case 'AUTH_LOGOUT': return authLogout(state, action);
        default: return state
    }
}

export default reducer;