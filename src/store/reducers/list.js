import * as actions from '../actions/constants';

const initialState = {
  lists: {
    col1: {
      id: 'col1',
      title: 'To do',
      taskIds: ['task1', 'task3', 'task4']
    },
    col2: {
      id: 'col2',
      title: 'Doing',
      taskIds: ['task2']
    },
    col3: {
      id: 'col3',
      title: 'Done',
      taskIds: []
    }
  },
  listIdWithOpenTaskInput: ''
};

export default function listReducer(state = initialState, action) {
  switch (action.type) {
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
    case actions.UPDATE_LISTS:
      return {
        ...state,
        lists: action.updatedLists
      };
    default:
      return state;
  }
}
