import axios from 'axios';

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
        const AuthData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        console.log(AuthData)
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXTE8yOl88kPOEhJxuPjhQ9KIpTIqpHyY', AuthData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data))
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            });
    };
};