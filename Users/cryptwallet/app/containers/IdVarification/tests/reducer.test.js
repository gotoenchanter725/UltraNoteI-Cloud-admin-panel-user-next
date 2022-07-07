import { fromJS } from 'immutable';
import idVarificationReducer from '../reducer';

describe('idVarificationReducer', () => {
  it('returns the initial state', () => {
    expect(idVarificationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
