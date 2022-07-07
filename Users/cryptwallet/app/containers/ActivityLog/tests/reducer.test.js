import { fromJS } from 'immutable';
import activityLogReducer from '../reducer';

describe('activityLogReducer', () => {
  it('returns the initial state', () => {
    expect(activityLogReducer(undefined, {})).toEqual(fromJS({}));
  });
});
