import { fromJS } from 'immutable';
import myWalletReducer from '../reducer';

describe('myWalletReducer', () => {
  it('returns the initial state', () => {
    expect(myWalletReducer(undefined, {})).toEqual(fromJS({}));
  });
});
