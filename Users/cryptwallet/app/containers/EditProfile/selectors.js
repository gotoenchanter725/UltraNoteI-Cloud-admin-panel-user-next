import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editProfile state domain
 */

const selectEditProfileDomain = state => state.get('editProfile', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditProfile
 */

const makeSelectEditProfile = () =>
  createSelector(selectEditProfileDomain, substate => substate.toJS());

export default makeSelectEditProfile;
export { selectEditProfileDomain };
