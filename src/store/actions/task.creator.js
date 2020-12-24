import { nanoid } from 'nanoid';
import * as actions from './constants';
import {
  addTask as addTaskToList,
  removeTask as removeTaskFromList
} from './list.creator';

export function addTask(content, listId) {
  return (dispatch, getStore) => {
    const taskId = nanoid();
    dispatch({
      type: actions.ADD_TASK,
      task: { id: taskId, content, authorId: getStore().authors.currentAuthorId }
    });
    dispatch(addTaskToList(listId, taskId));
  };
}

export function getTask(taskId) {
  return (dispatch, getStore) => {
    const task = getStore().tasks.tasks[taskId];
    dispatch({
      type: actions.GET_TASK,
      task
    });
  };
}

export function updateContent(taskId, content) {
  return (dispatch, getStore) => {
    console.log(content)
    const task = getStore().tasks.tasks[taskId];
    dispatch({
      type: actions.UPDATE_TASK,
      task: { ...task, content }
    });
  };
}

export function updateDescription(taskId, description) {
  return (dispatch, getStore) => {
    const task = getStore().tasks.tasks[taskId];
    dispatch({
      type: actions.UPDATE_TASK,
      task: { ...task, description }
    });
  };
}

export function removeTask(listId, taskId) {
  return (dispatch, getStore) => {
    const tasks = {...getStore().tasks.tasks};
    delete tasks[taskId];

    dispatch({
      type: actions.REMOVE_TASK,
      tasks: {...tasks}
    });
    dispatch(removeTaskFromList(listId, taskId));
  };
}

export function removeListTasks(taskIds) {
  return (dispatch, getStore) => {
    const tasks = {...getStore().tasks.tasks};
    console.log(taskIds)
    taskIds.forEach(id => {
      delete tasks[id];
    });

    dispatch({
      type: actions.REMOVE_LIST_TASKS,
      tasks: {...tasks}
    });
  };
}
