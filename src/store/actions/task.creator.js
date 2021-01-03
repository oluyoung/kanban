import { nanoid } from 'nanoid';
import { omit } from 'lodash';
import * as actions from './constants';
import {
  addTask as addTaskToList,
  removeTask as removeTaskFromList
} from './list.creator';
import storeService from '../store.service';
import history from '../../history';

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

export function getTasksForBoard() {
  return (dispatch, getStore) => {
    storeService.getTasksForBoard(getStore().boards.currentBoardId)
      .then((tasks) => {
        dispatch({ type: actions.GET_TASKS, tasks });
      })
      .catch((error) => alert(error.message));
  };
}

export function getTask(taskId, boardId) {
  return (dispatch) => {
    storeService.getTask(taskId)
      .then((task) => {
        dispatch({ type: actions.GET_TASK, task });
      })
      .catch((error) => {
        if (error.message === 'No task with that id exists') {
          history.push(`/b/${boardId}`)
        }
        alert(error.message);
      });
  };
}

export function updateContent(taskId, content) {
  return (dispatch, getStore) => {
    storeService.updateTask(taskId, {content})
      .then(() => {
        const task = getStore().tasks.tasks[taskId];
        dispatch({ type: actions.UPDATE_TASK, task: { ...task, content } });
      })
      .catch((error) => alert(error.message));
  };
}

export function updateDescription(taskId, description) {
  return (dispatch, getStore) => {
    storeService.updateTask(taskId, {description})
      .then(() => {
        const task = getStore().tasks.tasks[taskId];
        dispatch({ type: actions.UPDATE_TASK, task: { ...task, description } });
      })
      .catch((error) => alert(error.message));
  };
}

export function removeTask(task) {
  return (dispatch, getStore) => {
    dispatch(removeTaskFromList(task.listId, task.id));
    storeService.removeTask(task.id)
      .then(() => {
        const tasks = {...getStore().tasks.tasks};
        dispatch({ type: actions.REMOVE_TASK, tasks: omit(tasks, [task.id]) });
      })
      .catch((error) => alert(error.message));
  };
}

export function removeListTasks(taskIds) {
  return (dispatch, getStore) => {
    storeService.removeListTasks(taskIds)
      .then(() => {
        const tasks = {...getStore().tasks.tasks};
        dispatch({ type: actions.REMOVE_LIST_TASKS, tasks: omit(tasks, [taskIds]) });
      })
      .catch((error) => alert(error.message));
  };
}
