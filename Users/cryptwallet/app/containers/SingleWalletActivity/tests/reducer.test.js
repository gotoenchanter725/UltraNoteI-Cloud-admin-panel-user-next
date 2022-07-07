import { fromJS } from 'immutable';
import singleWalletActivityReducer from '../reducer';

describe('singleWalletActivityReducer', () => {
  it('returns the initial state', () => {
    expect(singleWalletActivityReducer(undefined, {})).toEqual(fromJS({}));
  });
});
