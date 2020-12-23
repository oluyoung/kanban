import { combineReducers } from 'redux';
import boardReducer from './reducers/board';
import listReducer from './reducers/list';
import taskReducer from './reducers/task';
import authorReducer from './reducers/author';
import modalsReducer from './reducers/modals';

const rootReducer = combineReducers({
  boards: boardReducer,
  lists: listReducer,
  tasks: taskReducer,
  authors: authorReducer,
  modals: modalsReducer
});

export default rootReducer;
