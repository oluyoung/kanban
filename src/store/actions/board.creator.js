import { nanoid } from 'nanoid';
import * as actions from './constants';
import storeService from '../store.service';
import { getTasksForBoard } from './task.creator';
import { getListsForBoard } from './list.creator';

export function getBoards() {
  return (dispatch, getStore) => {
    storeService.getBoardsForAuthor(getStore().authors.currentAuthorId)
      .then((boards) => {
        dispatch({ type: actions.GET_BOARDS, boards });
      })
      .catch((error) => alert(error.message));
  };
}

export function addBoard(title) {
  return (dispatch, getStore) => {
    const board = {
      id: nanoid(),
      title,
      listIds: [],
      listOrder: [],
      authorId: getStore().authors.currentAuthorId
    };

    storeService.addBoard(board)
      .then(() => {
        dispatch({ type: actions.ADD_BOARD, board });
      })
      .catch((error) => alert(error.message));
  };
}

export function addList(boardId, listId) {
  return (dispatch, getStore) => {
    storeService.addListToBoard(boardId, listId)
      .then(() => {
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
      })
      .catch((error) => alert(error.message));
  };
}

export function removeList(boardId, listId) {
  return (dispatch, getStore) => {
    storeService.removeListFromBoard(boardId, listId)
      .then(() => {
        const board = {...getStore().boards.boards[boardId]};
        const updatedListIds = board.listOrder.filter(id => (listId !== id));
        dispatch({
          type: actions.REMOVE_LIST_FROM_BOARD,
          updatedBoard: {
            ...board,
            listIds: updatedListIds,
            listOrder: updatedListIds
          }
        });
      })
      .catch((error) => alert(error.message));
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
    dispatch(getTasksForBoard());
    dispatch(getListsForBoard());
  };
}

export function addCurrentBoard(id) {
  return {
    type: actions.GET_CURRENT_BOARD,
    id
  };
}

export function removeCurrentBoard() {
  return {
    type: actions.REMOVE_CURRENT_BOARD
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
  }
}
