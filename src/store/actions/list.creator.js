import { nanoid } from 'nanoid';
import { omit, without } from 'lodash';
import * as actions from './constants';
import { removeListTasks } from './task.creator';
import {
  addList as addListToBoard,
  removeList as removeListFromBoard } from './board.creator';
import storeService from '../store.service';

export function openTaskInput(listId) {
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
  return (dispatch, getStore) => {
    storeService.getListsForBoard(getStore().boards.currentBoardId)
      .then((lists) => {
        dispatch({ type: actions.GET_LISTS, lists });
      })
      .catch((error) => alert(error.message));;
  };
}

export function addTask(listId, taskId) {
  return (dispatch, getStore) => {
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

export function removeTask(listId, taskId) {
  return (dispatch, getStore) => {
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

export function addList(boardId, title) {
  return (dispatch, getStore) => {
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

export function removeList(boardId, listId) {
  return (dispatch, getStore) => {
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

export function updateListTasksOrder(source, destination, draggableId) {
  return (dispatch, getStore) => {
    const list = getStore().lists.lists[source.droppableId];

    const taskIds = list.taskIds.filter((_, index) => (index !== source.index));
    taskIds.splice(destination.index, 0, draggableId);

    const lists = {
      ...getStore().lists.lists,
      [list.id]: {
        ...list,
        taskIds: [...taskIds]
      }
    };

    dispatch({
      type: actions.UPDATE_LISTS,
      lists
    });
  };
}

export function updateListsTasksOrder(source, destination, draggableId) {
  return (dispatch, getStore) => {
    const startList = getStore().lists.lists[source.droppableId];
    const endList = getStore().lists.lists[destination.droppableId];

    const startListTaskIds = startList.taskIds.filter((_, index) => (index !== source.index));

    const endListTaskIds = Array.from(endList.taskIds);
    endListTaskIds.splice(destination.index, 0, draggableId);

    const lists = {
      ...getStore().lists.lists,
      [startList.id]: {
        ...startList,
        taskIds: [...startListTaskIds]
      },
      [endList.id]: {
        ...endList,
        taskIds: [...endListTaskIds]
      }
    };

    dispatch({
      type: actions.UPDATE_LISTS,
      lists
    });
  };
}
