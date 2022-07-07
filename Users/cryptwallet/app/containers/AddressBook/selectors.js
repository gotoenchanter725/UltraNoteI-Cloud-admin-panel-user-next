import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the AddressBook state domain
 */

const selectAddressBookDomain = state => state.get('addressBook', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddressBook
 */

const makeSelectAddressBook = () =>
  createSelector(selectAddressBookDomain, substate => substate.toJS());

export default makeSelectAddressBook;
export { selectAddressBookDomain };
