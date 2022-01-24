import { nanoid } from 'nanoid';
import { omit } from 'lodash';
import { Dispatch } from 'react';
import * as actions from './constants';
import {
  addTask as addTaskToList,
  removeTask as removeTaskFromList
} from './list.creator';
import storeService from '../store.service';
import history from '../../history';
import { GetStore, TaskModel } from '../../types';

export function addTask(content: string, listId: string, boardId: string) {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
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
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
    const currentBoardId = getStore().boards.currentBoardId;
    if (currentBoardId) {
      storeService.getTasksForBoard(currentBoardId)
        .then((tasks) => {
          dispatch({ type: actions.GET_TASKS, tasks });
        })
        .catch((error) => alert(error.message));
    } else {
      alert('No current board');
    }
  };
}

export function getTask(taskId: string, boardId: string) {
  return (dispatch: Dispatch<any>) => {
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

export function updateContent(taskId: string, content: string) {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
    storeService.updateTask(taskId, {content})
      .then(() => {
        const task = getStore().tasks.tasks[taskId];
        dispatch({ type: actions.UPDATE_TASK, task: { ...task, content } });
      })
      .catch((error) => alert(error.message));
  };
}

export function updateDescription(taskId: string, description: string) {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
    storeService.updateTask(taskId, {description})
      .then(() => {
        const task = getStore().tasks.tasks[taskId];
        dispatch({ type: actions.UPDATE_TASK, task: { ...task, description } });
      })
      .catch((error) => alert(error.message));
  };
}

export function removeTask(task: TaskModel) {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
    dispatch(removeTaskFromList(task.listId, task.id));
    storeService.removeTask(task.id)
      .then(() => {
        const tasks = {...getStore().tasks.tasks};
        dispatch({ type: actions.REMOVE_TASK, tasks: omit(tasks, [task.id]) });
      })
      .catch((error) => alert(error.message));
  };
}

export function removeListTasks(taskIds: string[]) {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
    storeService.removeListTasks(taskIds)
      .then(() => {
        const tasks = {...getStore().tasks.tasks};
        dispatch({ type: actions.REMOVE_LIST_TASKS, tasks: omit(tasks, taskIds) });
      })
      .catch((error) => alert(error.message));
  };
}
