import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the singleWalletWithdraw state domain
 */

const selectSingleWalletWithdrawDomain = state =>
  state.get('singleWalletWithdraw', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SingleWalletWithdraw
 */

const makeSelectSingleWalletWithdraw = () =>
  createSelector(selectSingleWalletWithdrawDomain, substate => substate.toJS());

export default makeSelectSingleWalletWithdraw;
export { selectSingleWalletWithdrawDomain };
