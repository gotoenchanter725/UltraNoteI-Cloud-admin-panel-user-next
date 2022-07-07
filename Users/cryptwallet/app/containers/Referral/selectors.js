import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the referral state domain
 */

const selectReferralDomain = state => state.get('referral', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Referral
 */

const makeSelectReferral = () =>
  createSelector(selectReferralDomain, substate => substate.toJS());

export default makeSelectReferral;
export { selectReferralDomain };
