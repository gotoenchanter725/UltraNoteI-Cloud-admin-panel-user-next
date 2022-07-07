import { fromJS } from 'immutable';
import editProfileReducer from '../reducer';

describe('editProfileReducer', () => {
  it('returns the initial state', () => {
    expect(editProfileReducer(undefined, {})).toEqual(fromJS({}));
  });
});
