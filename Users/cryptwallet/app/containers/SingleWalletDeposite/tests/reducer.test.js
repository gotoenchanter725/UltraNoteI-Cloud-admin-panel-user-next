import { fromJS } from 'immutable';
import singleWalletDepositeReducer from '../reducer';

describe('singleWalletDepositeReducer', () => {
  it('returns the initial state', () => {
    expect(singleWalletDepositeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
