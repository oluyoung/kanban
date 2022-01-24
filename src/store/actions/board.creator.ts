import { nanoid } from 'nanoid';
import { DraggableLocation } from 'react-beautiful-dnd';
import * as actions from './constants';
import storeService from '../store.service';
import { getTasksForBoard } from './task.creator';
import { getListsForBoard } from './list.creator';
import { GetStore } from '../../types';
import { Dispatch } from 'react';

export function getBoards() {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
    dispatch({ type: actions.SET_LOADING, payload: true });
    const currentAuthorId = getStore().authors.currentAuthorId;
    if (currentAuthorId) {
      storeService.getBoardsForAuthor(currentAuthorId)
        .then((boards) => {
          dispatch({ type: actions.GET_BOARDS, boards });
        })
        .catch((error) => alert(error.message))
        .finally(() => dispatch({ type: actions.SET_LOADING, payload: false }));
    } else {
      dispatch({ type: actions.SET_LOADING, payload: false });
      alert('Author does not exist');
    }
  };
}

export function addBoard(title: string) {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
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

export function addList(boardId: string, listId: string) {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
    const board = {...getStore().boards.boards[boardId]};
    const updatedListIds = board.listOrder.concat(listId);
    storeService.updateListOnBoard(boardId, updatedListIds)
      .then(() => {
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

export function removeList(boardId: string, listId: string) {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
    const board = {...getStore().boards.boards[boardId]};
    const updatedListIds = board.listOrder.filter(id => (listId !== id));
    storeService.updateListOnBoard(boardId, updatedListIds)
      .then(() => {
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

export function getBoard(boardId: string, authorId: string) {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
    const boards = getStore().boards.boards;
    if (!Object.keys(boards).includes(boardId)) {
      return;
    }
    if (boards[boardId].authorId !== authorId) {
      console.log(boardId, authorId);
      return;
    }
    dispatch(addCurrentBoard(boardId));
    dispatch(getListsForBoard());
    dispatch(getTasksForBoard());
  };
}

export function addCurrentBoard(id: string) {
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

export function updateBoardListOrder(source: DraggableLocation, destination: DraggableLocation, draggableId: string) {
  return (dispatch: Dispatch<any>, getStore: GetStore) => {
    const currentBoard = getStore().boards.currentBoard;
    const currentBoardId = getStore().boards.currentBoardId;
    if (currentBoard && currentBoardId) {
      const updatedListOrder = currentBoard.listOrder.filter((_, i: number) => (i !== source.index));
      updatedListOrder.splice(destination.index, 0, draggableId);

      storeService.updateListOrder(currentBoardId, updatedListOrder)
        .then(() => {
          dispatch({
            type: actions.UPDATE_BOARD_LIST_ORDER,
            updatedListOrder
          });
        })
        .catch((error) => alert(error.message));
    } else {
      alert('No current board is available');
    }
  }
}
