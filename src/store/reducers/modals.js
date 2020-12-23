import * as actions from '../actions/constants';

const initialState = {
  task: undefined
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_TASK_IN_MODAL:
      return {
        task: action.task
      }
    default:
        return state;
  }
};
