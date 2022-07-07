import { createSelector } from 'reselect';


const selectUsers = state => state.user;

export  const  selectUserToken = createSelector(
[selectUsers],
user => user.token ? user.token : null 
);

export const selectProfileData = createSelector(
[selectUsers],
user => user.profiledata    
);


export const selectTwoFaEmail = createSelector(
[selectUsers],
user => user.email
);