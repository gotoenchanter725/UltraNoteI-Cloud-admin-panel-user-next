import { fromJS } from 'immutable';
import singleWalletWithdrawReducer from '../reducer';

describe('singleWalletWithdrawReducer', () => {
  it('returns the initial state', () => {
    expect(singleWalletWithdrawReducer(undefined, {})).toEqual(fromJS({}));
  });
});
