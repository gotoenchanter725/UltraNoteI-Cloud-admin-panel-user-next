import { fromJS } from 'immutable';
import referralReducer from '../reducer';

describe('referralReducer', () => {
  it('returns the initial state', () => {
    expect(referralReducer(undefined, {})).toEqual(fromJS({}));
  });
});
