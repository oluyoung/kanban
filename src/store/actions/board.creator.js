import { nanoid } from 'nanoid';
import * as actions from './constants';
import { getLists } from './list.creator';
import { getTasks } from './task.creator';

export function addBoard(title) {
  return (dispatch, getStore) => {
    dispatch({
      type: actions.ADD_BOARD,
      authorId: getStore().authors.currentAuthorId,
      board: {
        id: nanoid(),
        title
      }
    });
    dispatch(saveBoards());
  };
}

export function addList(boardId, listId) {
  return (dispatch, getStore) => {
    const board = {...getStore().boards.boards[boardId]};
    const updatedListIds = board.listIds.concat(listId);
    dispatch({
      type: actions.ADD_LIST_TO_BOARD,
      updatedBoard: {
        ...board,
        listIds: updatedListIds,
        listOrder: updatedListIds
      }
    });
    dispatch(saveBoards());
  };
}

export function removeList(boardId, listId) {
  return (dispatch, getStore) => {
    const board = {...getStore().boards.boards[boardId]};
    const updatedListIds = board.listOrder.filter(id => (listId !== id));
    dispatch({
      type: actions.ADD_LIST_TO_BOARD,
      updatedBoard: {
        ...board,
        listIds: updatedListIds,
        listOrder: updatedListIds
      }
    });
    dispatch(saveBoards());
  };
}

export function getBoard(boardId, authorId) {
  return (dispatch, getStore) => {
    const boards = getStore().boards.boards;
    if (!Object.keys(boards).includes(boardId)) {
      return;
    }
    if (boards[boardId].authorId !== authorId) {
      return;
    }
    dispatch(addCurrentBoard(boardId));
  }
}

export function addCurrentBoard(id) {
  return {
    type: actions.GET_CURRENT_BOARD,
    id
  };
}

export function updateBoardListOrder(source, destination, draggableId) {
  return (dispatch, getStore) => {
    const updatedListOrder = getStore().boards.currentBoard.listOrder.filter((_, index) => (index !== source.index));
    updatedListOrder.splice(destination.index, 0, draggableId);

    dispatch({
      type: actions.UPDATE_BOARD_LIST_ORDER,
      updatedListOrder
    });
    dispatch(saveBoards());
  }
}

export function saveBoards() {
  return (_, getStore) => {
    localStorage.setItem('boards', JSON.stringify(getStore().boards.boards));
  };
}

export function getBoards() {
  return (dispatch) => {
    const boards = localStorage.getItem('boards');
    if (boards) {
      dispatch(getLists());
      dispatch(getTasks());
      dispatch({
        type: actions.GET_BOARDS,
        boards: JSON.parse(boards)
      });
    }
  };
}
