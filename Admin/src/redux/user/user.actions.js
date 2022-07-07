import { UserActionTypes } from './user.types';

export const setCurrentUser = user => ({
type: UserActionTypes.SET_CURRENT_USER,
payload: user
});

export const setUserProfileData = profile => ({
type: UserActionTypes.SET_USER_PROFILE_DATA,    
payload:profile
});

export const SetEmailfortwofa = emailaddress => ({
type: UserActionTypes.SET_USER_EMAIL_AUTHICATOR,
payload:emailaddress
});