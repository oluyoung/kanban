import * as actions from './constants';
import { getLists } from './list.creator';
import { getTasks } from './task.creator';

export function updateBoardListOrder(source, destination, draggableId) {
  return (dispatch, getStore) => {
    const updatedListOrder = Array.from(getStore().boards.currentBoard.listOrder);
    updatedListOrder.splice(source.index, 1);
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

export function saveBoard() {
  return (_, getStore) => {
    localStorage.setItem('board', JSON.stringify(getStore().boards.boards));
  };
}

export function getBoard() {
  return (dispatch) => {
    dispatch(getLists());
    dispatch(getTasks());
  }
}
