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
