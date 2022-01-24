import { nanoid } from 'nanoid';
import { omit, without } from 'lodash';
import { Dispatch } from 'react';
import { DraggableLocation } from 'react-beautiful-dnd';
import * as actions from './constants';
import { removeListTasks } from './task.creator';
import {
  addList as addListToBoard,
  removeList as removeListFromBoard } from './board.creator';
import storeService from '../store.service';
import { GetStore } from '../../types';

export function openTaskInput(listId: string) {
  return {
    type: actions.OPEN_TASK_INPUT,
    listId
  };
}

export function closeTaskInput() {
  return {
    type: actions.CLOSE_TASK_INPUT,
  };
}

export function getListsForBoard() {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
    const currentBoardId = getStore().boards.currentBoardId;
    if (currentBoardId) {
      storeService.getListsForBoard(currentBoardId)
        .then((lists) => {
          dispatch({ type: actions.GET_LISTS, lists });
        })
        .catch((error) => alert(error.message));;
    } else {
      alert('No current board');
    }
  };
}

export function addTask(listId: string, taskId: string) {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
    storeService.addTaskToList(listId, taskId)
      .then(() => {
        const list = {...getStore().lists.lists[listId]};
        dispatch({
          type: actions.ADD_TASK_TO_LIST,
          updatedList: {
            ...list,
            taskIds: list.taskIds.concat(taskId)
          }
        });
      })
      .catch((error) => alert(error.message));
  };
}

export function removeTask(listId: string, taskId: string) {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
    storeService.removeTaskFromList(listId, taskId)
      .then(() => {
        const list = {...getStore().lists.lists[listId]};
        dispatch({
          type: actions.REMOVE_TASK_FROM_LIST,
          updatedList: {
            ...list,
            taskIds: without(list.taskIds, taskId)
          }
        });
      })
      .catch((error) => alert(error.message));
  };
}

export function addList(boardId: string, title: string) {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
    const listId = nanoid();
    const list = { id: listId, title, taskIds: [], authorId: getStore().authors.currentAuthorId, boardId };
    storeService.addList(list)
      .then(() => {
        dispatch({ type: actions.ADD_LIST, listId, list })
        dispatch(addListToBoard(boardId, listId));
      })
      .catch((error) => alert(error.message));
  };
}

export function removeList(boardId: string, listId: string) {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
    dispatch(removeListFromBoard(boardId, listId));
    storeService.removeList(listId)
      .then(() => {
        const list = {...getStore().lists.lists[listId]};
        const lists = {...getStore().lists.lists};
        dispatch(removeListTasks(list.taskIds));
        dispatch({ type: actions.REMOVE_LIST, lists: omit(lists, [listId]) });
      })
      .catch((error) => alert(error.message));
  };
}

export function updateListTasksOrder(source: DraggableLocation, destination: DraggableLocation, draggableId: string) {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
    const list = getStore().lists.lists[source.droppableId];

    const taskIds = list.taskIds.filter((_, index) => (index !== source.index));
    taskIds.splice(destination.index, 0, draggableId);

    storeService.updateTasksOnList(list.id, taskIds)
      .then(() => {
        const lists = {
          ...getStore().lists.lists,
          [list.id]: { ...list, taskIds: [...taskIds] }
        };
        dispatch({ type: actions.UPDATE_LISTS, lists });
      })
      .catch((error) => alert(error.message));
  };
}

export function updateListsTasksOrder(source: DraggableLocation, destination: DraggableLocation, draggableId: string) {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
    const sourceList = getStore().lists.lists[source.droppableId];
    const destinationList = getStore().lists.lists[destination.droppableId];

    const sourceListTaskIds = sourceList.taskIds.filter((_, index) => (index !== source.index));

    const destinationListTaskIds = Array.from(destinationList.taskIds);
    destinationListTaskIds.splice(destination.index, 0, draggableId);

    storeService.updateListsTasksOrder(sourceList.id, sourceListTaskIds, destinationList.id, destinationListTaskIds)
      .then(() => {
        const lists = {
          ...getStore().lists.lists,
          [sourceList.id]: {
            ...sourceList,
            taskIds: [...sourceListTaskIds]
          },
          [destinationList.id]: {
            ...destinationList,
            taskIds: [...destinationListTaskIds]
          }
        };

        dispatch({ type: actions.UPDATE_LISTS, lists });
      })
      .catch((error) => alert(error.message));
  };
}
