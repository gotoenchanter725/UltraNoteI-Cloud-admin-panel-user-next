import { HomeActionTypes } from './home.types';

export const allUsers = users => ({
type: HomeActionTypes.SET_TOTAL_USERS,
payload:users 
});

export const totalBalance = totalbalancedata => ({
type: HomeActionTypes.SET_TOTAL_BALANCE,
payload:totalbalancedata
});

export const totalActiveUsers = activeusers => ({
type: HomeActionTypes.SET_ACTIVE_USERS,
payload:activeusers
});

export const totataldeposits = deposits => ({
type:HomeActionTypes.SET_DEPOSITS_TRANSACTION,
payload:deposits
});