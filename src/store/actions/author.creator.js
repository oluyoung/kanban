import { nanoid } from 'nanoid';
import * as actions from './constants';

export function addAuthor(username) {
  return (dispatch) => {
    dispatch({
      type: actions.ADD_AUTHOR,
      author: {
        id: nanoid(),
        username
      }
    });
  };
}

export function setCurrentAuthor(authorId) {
  return (dispatch, getStore) => {
    const author = getStore().authors.authors[authorId];
    if (author) {
      dispatch({
        type: actions.SET_AUTHOR,
        author
      });
    }
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({type: actions.LOGOUT});
    dispatch({type: actions.REMOVE_CURRENT_BOARD});
  };
}
