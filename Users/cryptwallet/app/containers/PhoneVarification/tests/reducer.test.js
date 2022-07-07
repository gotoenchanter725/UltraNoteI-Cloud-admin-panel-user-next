import { fromJS } from 'immutable';
import phoneVarificationReducer from '../reducer';

describe('phoneVarificationReducer', () => {
  it('returns the initial state', () => {
    expect(phoneVarificationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
