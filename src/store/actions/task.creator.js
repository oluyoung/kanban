import { nanoid } from 'nanoid';
import * as actions from './constants';
import {
  addTask as addTaskToList,
  removeTask as removeTaskFromList
} from './list.creator';
import storeService from '../store.service';

export function addTask(content, listId, boardId) {
  return (dispatch, getStore) => {
    const taskId = nanoid();
    const task = { id: taskId, content, authorId: getStore().authors.currentAuthorId, listId, boardId };
    storeService.addTask(task)
      .then(() => {
        dispatch({ type: actions.ADD_TASK, task });
        dispatch(addTaskToList(listId, taskId));
      })
      .catch((error) => alert(error.message));
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
    storeService.updateTask(taskId, {content})
      .then(() => {
        const task = getStore().tasks.tasks[taskId];
        dispatch({
          type: actions.UPDATE_TASK,
          task: { ...task, content }
        });
      })
      .catch((error) => alert(error.message));
  };
}

export function updateDescription(taskId, description) {
  return (dispatch, getStore) => {
    storeService.updateTask(taskId, {description})
      .then(() => {
        const task = getStore().tasks.tasks[taskId];
        dispatch({
          type: actions.UPDATE_TASK,
          task: { ...task, description }
        });
      })
      .catch((error) => alert(error.message));
  };
}

export function removeTask(task) {
  return (dispatch, getStore) => {
    storeService.removeTask(task.id)
      .then(() => {
        const tasks = {...getStore().tasks.tasks};
        dispatch(removeTaskFromList(task.listId, task.id));
        delete tasks[task.id];
        dispatch({ type: actions.REMOVE_TASK, tasks: {...tasks} });
      }).catch((error) => console.error(error));
  };
}

export function removeListTasks(taskIds) {
  return (dispatch, getStore) => {
    const tasks = {...getStore().tasks.tasks};
    taskIds.forEach(id => {
      delete tasks[id];
    });

    dispatch({
      type: actions.REMOVE_LIST_TASKS,
      tasks: {...tasks}
    });
  };
}
