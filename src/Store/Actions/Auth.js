

export const authStart = () => {
    return {
        type: 'AUTH_START'
    };
};

export const authSuccess = (AuthData) => {
    return {
        type: 'AUTH_SUCCESS',
        AuthData: AuthData
    };
};

export const authFail = (error) => {
    return {
        type: 'AUTH_FAIL',
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
    };
};