import { sendTwoCodeFailure } from './auth.actions';
import AuthTypes from './auth.types';


const INITIAL_STATE = {
    isRegistred: false,
    isLoggedIn: false,
    isLoading: false,
    user: null,
    userActivity: [],
    token: '',
    withdrawByMonth: [],
    depositByMonth: [],
    withdrawByDay: [],
    depositByDay: [],
    error: null
};


const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case AuthTypes.SIGNUP_START: 
            return {
                ...state,
                isLoading: true
            };
        case AuthTypes.SIGNUP_SUCCESS: 
            return {
                ...state,
                isRegistred: true,
                isLoading: false
            };
        case AuthTypes.LOGIN_START:
            return {
                ...state,
                isLoading: true
            };
        case AuthTypes.LOGIN_SUCESS:
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return {
                ...state,
                isRegistred: true,
                isLoading: false,
                isLoggedIn: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case AuthTypes.AUTO_LOGIN: 
            return {
                ...state,
                isRegistred: true,
                isLoading: false,
                isLoggedIn: true,
                user: action.payload.user,
                token: action.payload.token
            };

        case AuthTypes.ENABLE_TWO_AUTH_SUCCESS:
            const userUpdated = state.user;
            userUpdated.two_fact_auth = action.payload.isActive;
            localStorage.setItem('user', JSON.stringify(userUpdated));
            return {
                ...state,
                user: userUpdated
            } ;

        case AuthTypes.CHANGE_CURRENCY_SUCCESS:
            const userCurrencyUpdated = state.user;
            userCurrencyUpdated.currency = action.payload.currency;
            localStorage.setItem('user', JSON.stringify(userCurrencyUpdated));
            return {
                ...state,
                user: userCurrencyUpdated
            };

        case AuthTypes.SEND_CODE_TWO_AUTH_SUCCESS: 
            return {
                ...state,
                isRegistred: true,
                isLoading: false,
                isLoggedIn: true,
                user: action.payload.user,
                token: action.payload.token

            };

        case AuthTypes.DEPOSIT_AND_WITHDRAW_SUCCESS:
            return{
                ...state,
                withdrawByMonth: action.payload[0],
                depositByMonth: action.payload[1],
                withdrawByDay: action.payload[2],
                depositByDay: action.payload[3] 
            };

        case AuthTypes.UPDATE_PROFILE_SUCCESS:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return{
                ...state,
                user: action.payload
            };

        case AuthTypes.GET_USER_SUCCESS:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return{
                ...state,
                user: action.payload
            };

        case AuthTypes.ADD_CONTACT_SUCCESS:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return{
                ...state,
                user: action.payload
            };


        case AuthTypes.DELETE_CONTACT_SUCCESS:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return{
                ...state,
                user: action.payload
            };

        case AuthTypes.USER_ACTIVITY_SUCCESS:
            return{
                ...state,
                userActivity: action.payload
            };

        case AuthTypes.AUTH_RESET_SUCCESS:
            return { ...INITIAL_STATE};

        case AuthTypes.ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}

export default authReducer;