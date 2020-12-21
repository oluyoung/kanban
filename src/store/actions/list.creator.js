import { nanoid } from 'nanoid';
import * as actions from './constants';
import { addList as addListToBoard } from './board.creator';

export function updateListTasksOrder(source, destination, draggableId) {
  return (dispatch, getStore) => {
    const list = getStore().lists.lists[source.droppableId];

    const taskIds = list.taskIds.filter((_, index) => (index === source.index));
    taskIds.splice(destination.index, 0, draggableId);

    const updatedLists = {
      ...getStore().lists.lists,
      [list.id]: {
        ...list,
        taskIds: [...taskIds]
      }
    };

    dispatch({
      type: actions.UPDATE_LISTS,
      updatedLists
    });
    dispatch(saveLists());
  };
}

export function updateListsTasksOrder(source, destination, draggableId) {
  return (dispatch, getStore) => {
    const startList = getStore().lists.lists[source.droppableId];
    const endList = getStore().lists.lists[destination.droppableId];

    const startListTaskIds = startList.taskIds.filter((_, index) => (index === source.index));

    const endListTaskIds = Array.from(endList.taskIds);
    endListTaskIds.splice(destination.index, 0, draggableId);

    const updatedLists = {
      ...getStore().lists.lists,
      [startList.id]: {
        ...startList,
        taskIds: [...startListTaskIds]
      },
      [endList.id]: {
        ...endList,
        taskIds: [...endListTaskIds]
      }
    };

    dispatch({
      type: actions.UPDATE_LISTS,
      updatedLists
    });
    dispatch(saveLists());
  };
}

export function openTaskInput(listId) {
  return {
    type: actions.OPEN_TASK_INPUT,
    listId
  };
}

export function closeTaskInput() {
  return {
    type: actions.CLOSE_TASK_INPUT,
  };
}

export function addTask(listId, taskId) {
  return (dispatch, getStore) => {
    const list = {...getStore().lists.lists[listId]};
    const updatedList = {
      ...list,
      taskIds: list.taskIds.concat(taskId)
    };

    dispatch({
      type: actions.ADD_TASK_TO_LIST,
      updatedList
    });
    dispatch(saveLists());
  };
}

export function removeTask(listId, taskId) {
  return (dispatch, getStore) => {
    const list = {...getStore().lists.lists[listId]};
    const updatedList = {
      ...list,
      taskIds: list.taskIds.filter(id => (taskId !== id))
    };

    dispatch({
      type: actions.REMOVE_TASK_FROM_LIST,
      updatedList
    });
    dispatch(saveLists());
  }
}

export function addList(boardId, title) {
  return (dispatch) => {
    const listId = nanoid();
    dispatch({
      type: actions.ADD_LIST,
      listId,
      list: {id: listId, title, taskIds: []}
    });
    dispatch(addListToBoard(boardId, listId));
  };
}

export function saveLists() {
  return (_, getStore) => {
    localStorage.setItem('lists', JSON.stringify(getStore().lists.lists));
  };
}

export function getLists() {
  const lists = localStorage.getItem('lists');
  if (lists) {
    return {
      type: actions.GET_LISTS,
      lists: JSON.parse(lists)
    };
  }
}
