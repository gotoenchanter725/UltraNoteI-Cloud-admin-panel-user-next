import { fromJS } from 'immutable';
import ressetPasswordReducer from '../reducer';

describe('ressetPasswordReducer', () => {
  it('returns the initial state', () => {
    expect(ressetPasswordReducer(undefined, {})).toEqual(fromJS({}));
  });
});
