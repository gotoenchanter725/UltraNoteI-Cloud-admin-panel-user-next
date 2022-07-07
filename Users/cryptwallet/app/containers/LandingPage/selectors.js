import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the landingPage state domain
 */

const selectLandingPageDomain = state => state.get('landingPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by LandingPage
 */

const makeSelectLandingPage = () =>
  createSelector(selectLandingPageDomain, substate => substate.toJS());

export default makeSelectLandingPage;
export { selectLandingPageDomain };
