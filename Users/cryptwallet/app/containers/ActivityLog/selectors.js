import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the activityLog state domain
 */

const selectActivityLogDomain = state => state.get('activityLog', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ActivityLog
 */

const makeSelectActivityLog = () =>
  createSelector(selectActivityLogDomain, substate => substate.toJS());

export default makeSelectActivityLog;
export { selectActivityLogDomain };
