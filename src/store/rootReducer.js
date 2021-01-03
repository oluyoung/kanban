import { combineReducers } from 'redux';
import boardReducer from './reducers/board';
import listReducer from './reducers/list';
import taskReducer from './reducers/task';
import authorReducer from './reducers/author';
import { LOGOUT } from './actions/constants';

const reducers = combineReducers({
  boards: boardReducer,
  lists: listReducer,
  tasks: taskReducer,
  authors: authorReducer
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return reducers(state, action);
}

export default rootReducer;
