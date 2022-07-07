import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ressetPassword state domain
 */

const selectRessetPasswordDomain = state =>
  state.get('ressetPassword', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by RessetPassword
 */

const makeSelectRessetPassword = () =>
  createSelector(selectRessetPasswordDomain, substate => substate.toJS());

export default makeSelectRessetPassword;
export { selectRessetPasswordDomain };
