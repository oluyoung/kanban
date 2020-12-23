import * as actions from '../actions/constants';

const initialState = {
  lists: {},
  listIdWithOpenTaskInput: ''
};

export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_LIST:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.listId]: action.list
        }
      };
    case actions.GET_LISTS:
      return {
        ...state,
        lists: {...action.lists}
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
      return {
        ...state,
        lists: action.updatedLists
      };
    default:
      return state;
  }
}
