import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the singleWalletActivity state domain
 */

const selectSingleWalletActivityDomain = state =>
  state.get('singleWalletActivity', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SingleWalletActivity
 */

const makeSelectSingleWalletActivity = () =>
  createSelector(selectSingleWalletActivityDomain, substate => substate.toJS());

export default makeSelectSingleWalletActivity;
export { selectSingleWalletActivityDomain };
