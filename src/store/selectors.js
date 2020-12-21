export function getBoardLists(state) {
  return state.boards.currentBoard.listIds.map(listId => {
    return state.lists.lists[listId];
  });
}

export function getListTasks(state, listId) {
  return state.lists.lists[listId].taskIds.map(taskId => {
    return state.tasks.tasks[taskId];
  });
}

export function getAuthorBoards(state, author) {
  return Object.keys(state.boards.boards).reduce((boards, boardId) => {
    const board = state.boards.boards[boardId];
    if (board.authorId === author.id) {
      return boards.concat({
        id: board.id,
        title: board.title
      });
    }
    return boards;
  }, []);
}