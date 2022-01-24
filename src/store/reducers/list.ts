import * as actions from '../actions/constants';
import { ListsState, Action } from '../../types';

const initialState: ListsState = {
  lists: {},
  listIdWithOpenTaskInput: ''
};

export default function listReducer(state = initialState, action: Action): ListsState {
  switch (action.type) {
    case actions.ADD_LIST:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.listId]: action.list
        }
      };
    case actions.REMOVE_TASK_FROM_LIST:
    case actions.ADD_TASK_TO_LIST:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.updatedList.id]: action.updatedList
        },
        listIdWithOpenTaskInput: ''
      };
    case actions.OPEN_TASK_INPUT:
      return {
        ...state,
        listIdWithOpenTaskInput: action.listId
      };
    case actions.CLOSE_TASK_INPUT:
      return {
        ...state,
        listIdWithOpenTaskInput: ''
      };
    case actions.UPDATE_LISTS:
    case actions.REMOVE_LIST:
    case actions.GET_LISTS:
      return {
        ...state,
        lists: {...action.lists}
      };
    default:
      return state;
  }
}
