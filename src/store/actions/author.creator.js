import { nanoid } from 'nanoid';
import storeService from '../store.service';
import * as actions from './constants';

export function addAuthor(username) {
  return (dispatch) => {
    const author = { id: nanoid(), username };
    storeService.addAuthor(author)
      .then(() => {
        dispatch({ type: actions.ADD_AUTHOR, author });
      })
      .catch((error) => alert(error.message));
  };
}

export function getAuthors() {
  return (dispatch) => {
    dispatch({ type: actions.SET_LOADING, payload: true });
    storeService.getAuthors()
      .then((authors) => dispatch({ type: actions.GET_AUTHORS, authors }))
      .catch((error) => alert(error.message))
      .finally(() => dispatch({ type: actions.SET_LOADING, payload: false }));
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

export function deleteBoard(id) {
  return (dispatch) => {
    storeService.removeBoard(id)
      .then(() => {
        dispatch({ type: actions.DELETE_BOARD, id });
      })
      .catch((error) => alert(error.message));
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: actions.LOGOUT });
  };
}
