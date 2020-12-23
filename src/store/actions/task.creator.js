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
    dispatch(saveTasks());
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
    dispatch(saveTasks());
  };
}

export function updateDescription(taskId, description) {
  return (dispatch, getStore) => {
    const task = getStore().tasks.tasks[taskId];
    dispatch({
      type: actions.UPDATE_TASK,
      task: { ...task, description }
    });
    dispatch(saveTasks());
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
    dispatch(saveTasks());
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
    dispatch(saveTasks());
  };
}

export function saveTasks() {
  return (_, getStore) => {
    localStorage.setItem('tasks', JSON.stringify(getStore().tasks.tasks));
  };
}

export function getTasks() {
  return (dispatch) => {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      dispatch({
        type: actions.GET_TASKS,
        tasks: JSON.parse(tasks)
      });
    }
  };
}
