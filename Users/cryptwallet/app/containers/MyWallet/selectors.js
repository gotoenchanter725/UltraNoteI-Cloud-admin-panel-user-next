import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the myWallet state domain
 */

const selectMyWalletDomain = state => state.get('myWallet', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MyWallet
 */

const makeSelectMyWallet = () =>
  createSelector(selectMyWalletDomain, substate => substate.toJS());

export default makeSelectMyWallet;
export { selectMyWalletDomain };
