/**
 * Created by yunxian on 2017/6/2.
 */
import { handleActions } from 'redux-actions';
import Immutable from 'immutable';

export default function createReducer(actions, initialState) {
  return handleActions(actions, Immutable.fromJS(initialState));
}