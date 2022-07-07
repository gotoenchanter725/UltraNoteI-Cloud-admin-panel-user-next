import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Billing state domain
 */

const selectBillingDomain = state => state.get('billing', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Billing
 */

const makeSelectBilling = () =>
  createSelector(selectBillingDomain, substate => substate.toJS());

export default makeSelectBilling;
export { selectBillingDomain };
