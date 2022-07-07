import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the singleWallet state domain
 */

const selectSingleWalletDomain = state =>
  state.get('singleWallet', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SingleWallet
 */

const makeSelectSingleWallet = () =>
  createSelector(selectSingleWalletDomain, substate => substate.toJS());

export default makeSelectSingleWallet;
export { selectSingleWalletDomain };
