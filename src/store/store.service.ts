import { initializeApp } from "firebase/app";
import { query, where, collection, getDoc, getDocs, deleteDoc, setDoc, doc, updateDoc, arrayUnion, arrayRemove, getFirestore } from "firebase/firestore";
import { AuthorModel, BoardModel, ListModel, TaskModel } from "../types";

const firebaseConfig = {
  apiKey: "AIzaSyArMVNWhoG9LhcjU_UvUTFo0r-0XGVlXDk",
  authDomain: "six-task.firebaseapp.com",
  databaseURL: "https://six-task.firebaseio.com",
  projectId: "six-task",
  storageBucket: "six-task.appspot.com",
  messagingSenderId: "28885894950",
  appId: "1:28885894950:web:e30d98fcfbcf96ba8323e7",
  measurementId: "G-QJLXFXG8JZ"
};

initializeApp(firebaseConfig);

const db = getFirestore();

const TASKS = 'tasks';
const AUTHORS = 'authors';
const BOARDS = 'boards';
const LISTS = 'lists';

type Collection = 'tasks' | 'authors' | 'boards' | 'lists';
type Resource = Partial<TaskModel> | Partial<BoardModel> | Partial<ListModel> | Partial<AuthorModel>;

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

class StoreFunctions {
  public collection: Collection;
  public plural: string;
  public singular: string;

  constructor(collection: Collection) {
    this.collection = collection;
    this.plural = collection.toLowerCase();
    this.singular = collection.toLowerCase().substring(0, collection.length-1);
  }

  public add(resource: Resource) {
    const id = resource.id;
    if (id) {
      return setDoc(doc(db, this.collection, id), {
        ...resource,
        created: new Date(),
        updated: new Date()
      });
    }
    return Promise.reject();
  }

  public update(id: string, update: Resource) {
    return updateDoc(doc(db, this.collection, id), {
      ...update,
      updated: new Date()
    });
  }

  public delete(id: string) {
    return deleteDoc(doc(db, this.collection, id));
  }

  public async get(id: string) {
    try {
      const snap = await getDoc(doc(db, this.collection, id));
      if (snap.exists()) {
        return snap.data();
      } else {
        throw new Error(`No ${this.singular} with that id exists.`);
      }
    } catch (error) {
      throw error;
    }
  }

  public async getAll() {
    const snap = await getDocs(collection(db, this.collection));
    const data: Record<string, Resource> = {};
    snap.forEach((doc) => {
      data[doc.id] = doc.data();
    });
    return data;
  }

  public async getAllForParent(modelIdPropertyName: string, modelId: string) {
    const ref = collection(db, this.collection);
    const q = query(ref, where(modelIdPropertyName, '==', modelId));
    const querySnapshots = await getDocs(q);
    const data: Record<string, Resource> = {};
    querySnapshots.forEach((doc) => {
      data[doc.id] = doc.data();
    });
    return data;
  }
}

const taskStore = new StoreFunctions(TASKS);
const authorStore = new StoreFunctions(AUTHORS);
const boardStore = new StoreFunctions(BOARDS);
const listStore = new StoreFunctions(LISTS);

const storeService = new StoreService();
export default storeService;
