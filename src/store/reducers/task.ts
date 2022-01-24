import * as actions from '../actions/constants';
import { TasksState, Action } from '../../types';

const initialState: TasksState = {
  tasks: {},
  currentTaskId: undefined,
  currentTask: undefined
};

export default function taskReducer(state = initialState, action: Action): TasksState {
  switch (action.type) {
    case actions.UPDATE_TASK:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task.id]: {
            ...action.task
          }
        },
        currentTask: {...action.task}
      };
    case actions.GET_TASK:
      return {
        ...state,
        currentTaskId: action.task.id,
        currentTask: {...action.task}
      };
    case actions.ADD_TASK:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task.id]: {...action.task}
        }
      };
    case actions.REMOVE_LIST_TASKS:
    case actions.REMOVE_TASK:
    case actions.GET_TASKS:
      return {
        ...state,
        tasks: {...action.tasks},
        currentTaskId: undefined,
        currentTask: undefined
      };
    default:
      return state;
  }
}
