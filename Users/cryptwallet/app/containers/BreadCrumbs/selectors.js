import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the breadCrumbs state domain
 */

const selectBreadCrumbsDomain = state => state.get('breadCrumbs', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BreadCrumbs
 */

const makeSelectBreadCrumbs = () =>
  createSelector(selectBreadCrumbsDomain, substate => substate.toJS());

export default makeSelectBreadCrumbs;
export { selectBreadCrumbsDomain };
