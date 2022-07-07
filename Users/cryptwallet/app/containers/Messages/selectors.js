import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Messages state domain
 */

const selectMessagesDomain = state => state.get('messages', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Messages
 */

const makeSelectMessages = () =>
  createSelector(selectMessagesDomain, substate => substate.toJS());

export default makeSelectMessages;
export { selectMessagesDomain };
