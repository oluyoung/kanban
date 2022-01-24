import * as actions from '../actions/constants';
import { AuthorsState, Action } from '../../types';

const initialState: AuthorsState = {
  authors: {},
  currentAuthorId: undefined,
  currentAuthor: undefined,
  loading: false,
};

export default function authorReducer(state = initialState, action: Action): AuthorsState {
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
        ...state,
        authors: {...action.authors}
      };
    case actions.LOGOUT:
      return {
        ...state,
        currentAuthorId: undefined,
        currentAuthor: undefined
      }
    case actions.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
}
