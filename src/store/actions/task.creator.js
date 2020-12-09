import { nanoid } from 'nanoid';
import * as actions from './constants';
import {
  addTask as addTaskToList,
  removeTask as removeTaskFromList } from './list.creator';

export function addTask(content, listId) {
  return (dispatch, getStore) => {
    const taskId = nanoid();
    dispatch({
      type: actions.ADD_TASK,
      task: { id: taskId, content, authorId: getStore().authors.currentAuthorId }
    });
    dispatch(addTaskToList(listId, taskId));
    dispatch(saveTasks());
  };
}

export function removeTask(listId, taskId) {
  return (dispatch, getStore) => {
    dispatch({
      type: actions.REMOVE_TASK,
      taskId
    });
    dispatch(removeTaskFromList(listId, taskId));
    dispatch(saveTasks());
  };
}

export function saveTasks() {
  return (_, getStore) => {
    localStorage.setItem('tasks', JSON.stringify(getStore().tasks.tasks));
  };
}

export function getTasks() {
  const tasks = localStorage.getItem('tasks');
  if (tasks) {
    return {
      type: actions.GET_TASKS,
      tasks: JSON.parse(tasks)
    };
  }
}
