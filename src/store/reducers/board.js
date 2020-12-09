import * as actions from '../actions/constants';

const initalData = {
  boards: {
    board1: {
      id: 'board1',
      title: 'Awesome Project Management',
      listIds: ['col1', 'col2', 'col3'],
      listOrder: ['col1', 'col2', 'col3']
    }
  },
  currentBoardId: 'board1',
  currentBoard: {
    id: 'board1',
    title: 'Awesome Project Management',
    listIds: ['col1', 'col2', 'col3'],
    listOrder: ['col1', 'col2', 'col3']
  }
};

const initialState = initalData

export default function boardReducer(state = initialState, action) {
  switch(action.type) {
    case actions.GET_BOARD:
      return {
        ...state,
        boards: {...action.boards}
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
