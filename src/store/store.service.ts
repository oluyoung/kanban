import { arrayUnion, arrayRemove } from "firebase/firestore";
import { AuthorModel, BoardModel, ListModel, TaskModel } from "../types";
import {
  taskStore,
  authorStore,
  boardStore,
  listStore
} from './storeFunctions';

class StoreService {
  getTasksForBoard = (boardId: string) => taskStore.getAllForParent('boardId', boardId);

  addTask = (task: Partial<TaskModel>) => taskStore.add(task);

  updateTask = (id: string, data: Partial<TaskModel>) => taskStore.update(id, data);

  removeTask = (id: string) => taskStore.delete(id);

  getTask = (id: string) => taskStore.get(id);

  removeListTasks = (ids: string[]) => Promise.all(ids.map(id => this.removeTask(id)));

  getAuthors = () => authorStore.getAll();

  addAuthor = (author: Partial<AuthorModel>) => authorStore.add(author);

  addList = (list: Partial<ListModel>) => listStore.add(list);
  
  removeList = (id: string) => listStore.delete(id);

  addTaskToList = (id: string, taskId: string) => listStore.update(id, { taskIds: arrayUnion(taskId) as unknown as string[] });

  removeTaskFromList = (id: string, taskId: string) => listStore.update(id, { taskIds: arrayRemove(taskId) as unknown as string[] });

  updateListsTasksOrder = (sourceId: string, sourceTaskids: string[], destinationId: string, destinationTaskIds: string[]) =>
    Promise.all([
      listStore.update(sourceId, { taskIds: sourceTaskids }),
      listStore.update(destinationId, { taskIds: destinationTaskIds })
    ]);

  getListsForBoard = (boardId: string) => listStore.getAllForParent('boardId', boardId);

  addBoard = (board: Partial<BoardModel>) => boardStore.add(board);
  
  getBoardsForAuthor = (authorId: string) => boardStore.getAllForParent('authorId', authorId);

  getBoard = (id: string) => boardStore.get(id);

  removeBoard = (id: string) => boardStore.delete(id);

  updateTasksOnList = (id: string, taskIds: string[]) =>
    listStore.update(id, { taskIds, listOrder: taskIds });

  updateListOnBoard = (id: string, listIds: string[]) =>
    boardStore.update(id, { listIds, listOrder: listIds });

  updateListOrder = (id: string, listOrder: string[]) => boardStore.update(id, { listOrder });
}

const storeService = new StoreService();
export default storeService;
