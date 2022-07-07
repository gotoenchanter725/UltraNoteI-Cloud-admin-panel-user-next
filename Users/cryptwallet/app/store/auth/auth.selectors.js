import { createSelector } from "reselect";


const authSelector = (state) => {
  return state.get('auth');
};

export const selectToken = createSelector(
  [authSelector],
  (auth) => auth.token
);

export const selectUser = createSelector(
    [authSelector],
    (auth) => auth.user
  );

export const selectIsLoggedIn = createSelector(
  [authSelector],
  (auth) => auth.isLoggedIn
);


export const selectWithdrawByMonth = createSelector(
  [authSelector],
  (auth) => auth.withdrawByMonth
);

export const selectDepositByMonth = createSelector(
  [authSelector],
  (auth) => auth.depositByMonth
);

export const selectWithdrawByDay = createSelector(
  [authSelector],
  (auth) => auth.withdrawByDay
);

export const selectDepositByDay = createSelector(
  [authSelector],
  (auth) => auth.depositByDay
);

export const selectUserActivity = createSelector(
  [authSelector],
  (auth) => auth.userActivity
);
