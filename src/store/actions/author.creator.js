import { nanoid } from 'nanoid';
import * as actions from './constants';
import { getBoards } from './board.creator';

export function addAuthor(username) {
  return (dispatch) => {
    dispatch({
      type: actions.ADD_AUTHOR,
      author: {
        id: nanoid(),
        username
      }
    });
    dispatch(saveAuthors());
  };
}

export function getAuthor() {
  return (dispatch) => {
    dispatch(getAuthors());
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
      dispatch(saveAuthors());
    }
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({type: actions.LOGOUT});
    dispatch(saveAuthors());
  };
}

export function saveAuthors() {
  return (_, getStore) => {
    localStorage.setItem('authors', JSON.stringify(getStore().authors));
  };
}

export function getAuthors() {
  return (dispatch) => {
    const authors = localStorage.getItem('authors');
    if (authors) {
      dispatch({
        type: actions.GET_AUTHORS,
        authors: JSON.parse(authors)
      });
      dispatch(getBoards());
    }
  };
}