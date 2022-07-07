import AuthTypes from './auth.types';

export const signupStart = (payload) => ({
    type: AuthTypes.SIGNUP_START,
    payload
});

export const signupSuccess = () => ({
    type: AuthTypes.SIGNUP_SUCCESS
});

export const signupFailure = (error) => ({
    type: AuthTypes.ERROR,
    payload: error
});

export const loginStart = (payload) => ({
    type: AuthTypes.LOGIN_START,
    payload
});

export const loginSuccess = (payload) => ({
    type: AuthTypes.LOGIN_SUCESS,
    payload
});

export const loginFailure = (error) => ({
    type: AuthTypes.ERROR,
    payload: error
});

export const resetPasswordStart = (payload) => ({
    type: AuthTypes.RESET_PASSWORD,
    payload
});

export const resetPasswordSuccess = (payload) => ({
    type: AuthTypes.RESET_PASSWORD_SUCCESS,
    payload
});

export const resetPasswordFailure = (payload) => ({
    type: AuthTypes.ERROR,
    payload
});

export const requestEmailResetStart = (payload) => ({
    type: AuthTypes.REQUEST_EMAIL_RESET,
    payload
});

export const requestEmailResetSuccess = (payload) => ({
    type: AuthTypes.REQUEST_EMAIL_RESET_SUCCESS,
    payload
});

export const requestEmailResetFailure = (payload) => ({
    type: AuthTypes.ERROR,
    payload
});


export const enableTwoAuthStart = (payload) => ({
    type: AuthTypes.ENABLE_TWO_AUTH,
    payload
});

export const enableTwoAuthSuccess = (payload) => ({
    type: AuthTypes.ENABLE_TWO_AUTH_SUCCESS,
    payload
});

export const enableTwoAuthFailure = (payload) => ({
    type: AuthTypes.ERROR,
    payload
});

export const changeCurrencyStart = (payload) => ({
    type: AuthTypes.CHANGE_CURRENCY,
    payload
});

export const changeCurrencySuccess = (payload) => ({
    type: AuthTypes.CHANGE_CURRENCY_SUCCESS,
    payload
});

export const autoLogin = (payload) => ({
    type: AuthTypes.AUTO_LOGIN,
    payload
});


export const sendTwoCodeStart = (payload) => ({
    type: AuthTypes.SEND_CODE_TWO_AUTH,
    payload
});

export const sendTwoCodeSuccess = (payload) => ({
    type: AuthTypes.SEND_CODE_TWO_AUTH_SUCCESS,
    payload
});

export const sendTwoCodeFailure = (payload) => ({
    type: AuthTypes.ERROR,
    payload
});

export const updateProfileStart = (payload) => ({
    type: AuthTypes.UPDATE_PROFILE_START,
    payload
});

export const updateProfileSuccess = (payload) => ({
    type: AuthTypes.UPDATE_PROFILE_SUCCESS,
    payload
});

export const updateProfileFailure = (payload) => ({
    type: AuthTypes.ERROR,
    payload
});

export const depositAndWithdrawStart = (payload) => ({
    type: AuthTypes.DEPOSIT_AND_WITHDRAW_START,
    payload
});

export const depositAndWithdrawSuccess = (payload) => ({
    type: AuthTypes.DEPOSIT_AND_WITHDRAW_SUCCESS,
    payload
});

export const authReset = () => ({
    type: AuthTypes.AUTH_RESET
});

export const authResetSuccess = () => ({
    type: AuthTypes.AUTH_RESET_SUCCESS
});

export const getUser = () => ({
    type: AuthTypes.GET_USER
});

export const getUserSuccess = (payload) => ({
    type: AuthTypes.GET_USER_SUCCESS,
    payload
});

export const addContact = (payload) => ({
    type: AuthTypes.ADD_CONTACT,
    payload
});

export const addContactSuccess = (payload) => ({
    type: AuthTypes.ADD_CONTACT_SUCCESS,
    payload
});

export const deleteContact = (payload) => ({
    type: AuthTypes.DELETE_CONTACT,
    payload
});

export const deleteContactSuccess = (payload) => ({
    type: AuthTypes.DELETE_CONTACT_SUCCESS,
    payload
});

export const userActivity = (payload) => ({
    type: AuthTypes.USER_ACTIVITY,
    payload
});

export const userActivitySuccess = (payload) => ({
    type: AuthTypes.USER_ACTIVITY_SUCCESS,
    payload
});

export const throwError = (error) => ({
    type: AuthTypes.ERROR,
    payload: error
});