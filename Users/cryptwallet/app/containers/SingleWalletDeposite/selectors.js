import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the singleWalletDeposite state domain
 */

const selectSingleWalletDepositeDomain = state =>
  state.get('singleWalletDeposite', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SingleWalletDeposite
 */

const makeSelectSingleWalletDeposite = () =>
  createSelector(selectSingleWalletDepositeDomain, substate => substate.toJS());

export default makeSelectSingleWalletDeposite;
export { selectSingleWalletDepositeDomain };
