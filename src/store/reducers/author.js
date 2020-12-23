import * as actions from '../actions/constants';

const initialState = {
  authors: {},
  currentAuthorId: undefined,
  currentAuthor: undefined
};

export default function authorReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_AUTHOR:
      return {
        ...state,
        currentAuthorId: action.author.id,
        currentAuthor: {...action.author}
      };
    case actions.ADD_AUTHOR:
      return {
        ...state,
        authors: {
          ...state.authors,
          [action.author.id]: {...action.author}
        }
      };
    case actions.GET_AUTHORS:
      return {
        ...action.authors
      };
    case actions.LOGOUT:
      return {
        ...state,
        currentAuthorId: undefined,
        currentAuthor: undefined
      }
    default:
      return state;
  }
}
