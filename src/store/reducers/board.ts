import * as actions from '../actions/constants';
import { BoardsState, Action, BoardModel } from '../../types';

const initialState: BoardsState = {
  boards: {},
  currentBoardId: undefined,
  currentBoard: undefined,
  loading: false,
};

export default function boardReducer(state = initialState, action: Action): BoardsState {
  switch(action.type) {
    case actions.GET_BOARDS:
      return {
        ...state,
        boards: {...action.boards}
      };
    case actions.ADD_BOARD:
      return {
        ...state,
        boards: {
          ...state.boards,
          [action.board.id]: { ...action.board }
        }
      };
    case actions.GET_CURRENT_BOARD:
      return {
        ...state,
        currentBoardId: action.id,
        currentBoard: { ...state.boards[action.id] }
      };
    case actions.REMOVE_CURRENT_BOARD:
      return {
        ...state,
        currentBoardId: undefined,
        currentBoard: undefined
      };
    case actions.DELETE_BOARD:
      const currentBoards = state.boards;
      delete currentBoards[action.id];

      return {
        ...state,
        boards: {
          ...currentBoards,
        }
      };
    case actions.REMOVE_LIST_FROM_BOARD:
    case actions.ADD_LIST_TO_BOARD:
      return {
        ...state,
        currentBoard: {...action.updatedBoard},
        boards: {
          ...state.boards,
          [action.updatedBoard.id]: {...action.updatedBoard}
        }
      };
    case actions.UPDATE_BOARD_LIST_ORDER:

      const updatedBoards = state.currentBoardId ? {
        ...state.boards,
        [state.currentBoardId]: {
          ...state.boards[state.currentBoardId],
          listOrder: action.updatedListOrder
        }
      } : state.boards;
      const updatedCurrentBoard = {
        ...state.currentBoard,
        listOrder: action.updatedListOrder
      };
      return {
        ...state,
        boards: updatedBoards,
        currentBoard: updatedCurrentBoard as BoardModel
      };
    case actions.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
}
