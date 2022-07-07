import { fromJS } from 'immutable';
import breadCrumbsReducer from '../reducer';

describe('breadCrumbsReducer', () => {
  it('returns the initial state', () => {
    expect(breadCrumbsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
