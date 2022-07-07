import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the idVarification state domain
 */

const selectIdVarificationDomain = state =>
  state.get('idVarification', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by IdVarification
 */

const makeSelectIdVarification = () =>
  createSelector(selectIdVarificationDomain, substate => substate.toJS());

export default makeSelectIdVarification;
export { selectIdVarificationDomain };
