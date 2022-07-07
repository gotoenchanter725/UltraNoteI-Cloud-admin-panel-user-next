import { fromJS } from 'immutable';
import addressBookReducer from '../reducer';

describe('addressBookReducer', () => {
  it('returns the initial state', () => {
    expect(addressBookReducer(undefined, {})).toEqual(fromJS({}));
  });
});
