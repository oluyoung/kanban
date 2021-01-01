import { nanoid } from 'nanoid';
import * as actions from './constants';
import { removeListTasks } from './task.creator';
import {
  addList as addListToBoard,
  removeList as removeListFromBoard } from './board.creator';

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

export function addTask(listId, taskId) {
  return (dispatch, getStore) => {
    const list = {...getStore().lists.lists[listId]};
    const updatedList = {
      ...list,
      taskIds: list.taskIds.concat(taskId)
    };

    dispatch({
      type: actions.ADD_TASK_TO_LIST,
      updatedList
    });
  };
}

export function removeTask(listId, taskId) {
  return (dispatch, getStore) => {
    const list = {...getStore().lists.lists[listId]};
    const updatedList = {
      ...list,
      taskIds: list.taskIds.filter(id => (taskId !== id))
    };

    dispatch({
      type: actions.REMOVE_TASK_FROM_LIST,
      updatedList
    });
  }
}

export function addList(boardId, title) {
  return (dispatch, getStore) => {
    const listId = nanoid();
    dispatch({
      type: actions.ADD_LIST,
      listId,
      list: {id: listId, title, taskIds: [], authorId: getStore().authors.currentAuthorId, boardId}
    });
    dispatch(addListToBoard(boardId, listId));
  };
}

export function removeList(boardId, listId) {
  return (dispatch, getStore) => {
    const list = {...getStore().lists.lists[listId]};
    const lists = {...getStore().lists.lists};
    delete lists[listId];

    dispatch({
      type: actions.ADD_LIST,
      lists: {...lists}
    });
    dispatch(removeListTasks(list.taskIds));
    dispatch(removeListFromBoard(boardId, listId));
  };
}

export function updateListTasksOrder(source, destination, draggableId) {
  return (dispatch, getStore) => {
    const list = getStore().lists.lists[source.droppableId];

    const taskIds = list.taskIds.filter((_, index) => (index !== source.index));
    taskIds.splice(destination.index, 0, draggableId);

    const updatedLists = {
      ...getStore().lists.lists,
      [list.id]: {
        ...list,
        taskIds: [...taskIds]
      }
    };

    dispatch({
      type: actions.UPDATE_LISTS,
      updatedLists
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

    const updatedLists = {
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
      updatedLists
    });
  };
}
