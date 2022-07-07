import { createSelector } from 'reselect';

const selectHome = state => state.home;

export const selectHomeUsers = createSelector(
[selectHome],
home => home.users
);

export const selectHomeBalance = createSelector(
[selectHome],    
home => home.totalbalancedata
);

export const selectActiveUsers = createSelector(
[selectHome],
home => home.totalActiveUsersData
);

export const selectdeposits = createSelector(
[selectHome],    
home => home.deposits    
);

export const selectTotalUsers = createSelector(
[selectHomeUsers],
users => users ? users.users.length : null
);

export const selectTotalBalance = createSelector(
[selectHomeBalance],
totalbalancedata => totalbalancedata ? totalbalancedata.length  : null
);


export const selectTotalActiveUsers = createSelector(
[selectActiveUsers],
totalActiveUsersData => totalActiveUsersData ? totalActiveUsersData.users.length :null
);


export const selectTotalDeposits = createSelector(
[selectdeposits],
deposits => deposits ? deposits.deposit : null
);

export const selectTotalWidrowls = createSelector(
[selectdeposits],
deposits => deposits ? deposits.withdraw : null
);

export const selectTotalDepositsAmount = createSelector(
[selectTotalDeposits],
deposit => deposit ?  deposit.reduce((total,thing) => total + thing.amount,0) : null
);

export const selectTotalWithdrawsAmount = createSelector(
[selectTotalWidrowls],
withdraw => withdraw ? withdraw.reduce((total,thing) => total + thing.amount,0) : null

);
    