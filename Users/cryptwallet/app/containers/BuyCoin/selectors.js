import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the buyCoin state domain
 */

const selectBuyCoinDomain = state => state.get('buyCoin', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BuyCoin
 */

const makeSelectBuyCoin = () =>
  createSelector(selectBuyCoinDomain, substate => substate.toJS());

export default makeSelectBuyCoin;
export { selectBuyCoinDomain };
