export function getBoardLists(state) {
  if (!state.boards.currentBoard) {
    return [];
  }
  return state.boards.currentBoard.listIds.map(listId => {
    return state.lists.lists[listId];
  });
}

export function getListTasks(state, listId) {
  return state.lists.lists[listId].taskIds.map(taskId => {
    return state.tasks.tasks[taskId];
  });
}

export function getAuthorBoards(state) {
  return Object.keys(state.boards.boards).reduce((boards, boardId) => {
    const board = state.boards.boards[boardId];
    if (board.authorId === state.authors.currentAuthorId) {
      return boards.concat({
        id: board.id,
        title: board.title
      });
    }
    return boards;
  }, []);
}

export function getAuthorsList(state) {
  return Object.keys(state.authors.authors).map((authorId) => {
    return state.authors.authors[authorId];
  });
}

export function getAuthorUsernames(state) {
  return Object.keys(state.authors.authors).map((authorId) => {
    return state.authors.authors[authorId].username;
  });
}
