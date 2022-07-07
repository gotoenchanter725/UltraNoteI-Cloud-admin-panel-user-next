import { fromJS } from 'immutable';
import singleWalletReducer from '../reducer';

describe('singleWalletReducer', () => {
  it('returns the initial state', () => {
    expect(singleWalletReducer(undefined, {})).toEqual(fromJS({}));
  });
});
