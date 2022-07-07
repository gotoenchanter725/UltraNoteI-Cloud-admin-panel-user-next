import { fromJS } from 'immutable';
import myProfileReducer from '../reducer';

describe('myProfileReducer', () => {
  it('returns the initial state', () => {
    expect(myProfileReducer(undefined, {})).toEqual(fromJS({}));
  });
});
