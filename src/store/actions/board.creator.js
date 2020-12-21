import * as actions from './constants';
import { getLists } from './list.creator';
import { getTasks } from './task.creator';

export function updateBoardListOrder(source, destination, draggableId) {
  return (dispatch, getStore) => {
    const updatedListOrder = getStore().boards.currentBoard.listOrder.filter((_, index) => (index !== source.index));
    updatedListOrder.splice(destination.index, 0, draggableId);

    dispatch({
      type: actions.UPDATE_BOARD_LIST_ORDER,
      updatedListOrder
    });
    dispatch(saveBoard());
  }
}

export function setupBoard() {
  return (dispatch, getStore) => {

  };
}

export function addList(boardId, listId) {
  return (dispatch, getStore) => {
    const board = {...getStore().boards.boards[boardId]};

    dispatch({
      type: actions.ADD_LIST_TO_BOARD,
      updatedBoard: {
        ...board,
        listIds: board.listIds.concat(listId),
        listOrder: board.listIds.concat(listId),
      }
    });
    dispatch(saveBoard());
  };
}

export function saveBoard() {
  return (_, getStore) => {
    localStorage.setItem('board', JSON.stringify(getStore().boards.boards));
  };
}

export function getBoard(id) {
  return (dispatch) => {
    dispatch(getLists());
    dispatch(getTasks());
  }
}
