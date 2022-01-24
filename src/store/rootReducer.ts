import { combineReducers } from 'redux';
import boardReducer from './reducers/board';
import listReducer from './reducers/list';
import taskReducer from './reducers/task';
import authorReducer from './reducers/author';
import { LOGOUT } from './actions/constants';
import { RootState, Action } from '../types';

const reducers = combineReducers<RootState>({
  tasks: taskReducer,
  boards: boardReducer,
  lists: listReducer,
  authors: authorReducer
});

const rootReducer = (state: RootState | undefined, action: Action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return reducers(state, action);
}

export default rootReducer;
