import * as actions from '../actions/constants';

const initialState = {
  tasks: {
    task1: { id: 'task1', content: 'Take out the garbage', authorId: 'author1'},
    task2: { id: 'task2', content: 'Watch my favorite show', authorId: 'author1'},
    task3: { id: 'task3', content: 'Charge my phone', authorId: 'author2'},
    task4: { id: 'task4', content: 'Cook dinner', authorId: 'author1'}
  },
  currentTaskId: undefined,
  currentTask: undefined
};

export default function taskReducer(state = initialState, action) {
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
          [action.task.id]: {
            id: action.task.id,
            content: action.task.content,
            authorId: action.task.authorId
          }
        }
      };
    case actions.REMOVE_LIST_TASKS:
    case actions.REMOVE_TASK:
    case actions.GET_TASKS:
      return {
        ...state,
        tasks: {...action.tasks}
      };
    default:
      return state;
  }
}
