import { fromJS } from 'immutable';
import billingReducer from '../reducer';

describe('billingReducer', () => {
  it('returns the initial state', () => {
    expect(billingReducer(undefined, {})).toEqual(fromJS({}));
  });
});
