import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the phoneVarification state domain
 */

const selectPhoneVarificationDomain = state =>
  state.get('phoneVarification', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PhoneVarification
 */

const makeSelectPhoneVarification = () =>
  createSelector(selectPhoneVarificationDomain, substate => substate.toJS());

export default makeSelectPhoneVarification;
export { selectPhoneVarificationDomain };
