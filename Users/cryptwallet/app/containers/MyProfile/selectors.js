import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the myProfile state domain
 */

const selectMyProfileDomain = state => state.get('myProfile', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MyProfile
 */

const makeSelectMyProfile = () =>
  createSelector(selectMyProfileDomain, substate => substate.toJS());

export default makeSelectMyProfile;
export { selectMyProfileDomain };
