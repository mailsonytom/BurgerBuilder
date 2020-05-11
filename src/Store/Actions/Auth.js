import axios from 'axios';

export const authStart = () => {
    return {
        type: 'AUTH_START'
    };
};

export const authSuccess = (token, userid) => {
    return {
        type: 'AUTH_SUCCESS',
        idToken: token,
        userId: userid
        // AuthData: AuthData
    };
};

export const authFail = (error) => {
    return {
        type: 'AUTH_FAIL',
        error: error
    };
};

export const logout = () => {
    return {
        type: 'AUTH_LOGOUT'
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const AuthData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXTE8yOl88kPOEhJxuPjhQ9KIpTIqpHyY';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXTE8yOl88kPOEhJxuPjhQ9KIpTIqpHyY';

        }
        axios.post(url, AuthData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId))
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
};