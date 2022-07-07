import { fromJS } from 'immutable';
import buyCoinReducer from '../reducer';

describe('buyCoinReducer', () => {
  it('returns the initial state', () => {
    expect(buyCoinReducer(undefined, {})).toEqual(fromJS({}));
  });
});
