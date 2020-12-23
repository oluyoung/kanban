import * as actions from '../actions/constants';

const initalData = {
  boards: {},
  currentBoardId: undefined,
  currentBoard: undefined
};

const initialState = initalData

export default function boardReducer(state = initialState, action) {
  switch(action.type) {
    case actions.GET_BOARDS:
      return {
        ...state,
        boards: action.boards
      };
    case actions.ADD_BOARD:
      return {
        ...state,
        boards: {
          ...state.boards,
          [action.board.id]: {
            id: action.board.id,
            title: action.board.title,
            listIds: [],
            listOrder: [],
            authorId: action.authorId
          }
        }
      };
    case actions.GET_CURRENT_BOARD:
      return {
        ...state,
        currentBoardId: action.id,
        currentBoard: { ...state.boards[action.id] }
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
      const updatedBoards = {
        ...state.boards,
        [state.currentBoardId]: {
          ...state.boards[state.currentBoardId],
          listOrder: action.updatedListOrder
        }
      };
      const updatedCurrentBoard = {
        ...state.currentBoard,
        listOrder: action.updatedListOrder
      };
      return {
        ...state,
        boards: updatedBoards,
        currentBoard: updatedCurrentBoard
      };
    default:
      return state;
  }
}
