import { fromJS } from 'immutable';
import messagesReducer from '../reducer';

describe('messagesReducer', () => {
  it('returns the initial state', () => {
    expect(messagesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
