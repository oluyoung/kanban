import { initializeApp } from "firebase/app";
import { query, where, collection, getDoc, getDocs, deleteDoc, setDoc, doc, updateDoc, arrayUnion, arrayRemove, getFirestore } from "firebase/firestore";

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

class StoreService {
  getTasksForBoard = (boardId) => taskStore.getAllForParent('boardId', boardId);

  addTask = (task) => taskStore.add(task);

  updateTask = (id, data) => taskStore.update(id, data);

  removeTask = (id) => taskStore.delete(id);

  getTask = (id) => taskStore.get(id);

  removeListTasks = (ids) => Promise.all(ids.map(id => this.removeTask(id)));

  getAuthors = () => authorStore.getAll();

  addAuthor = (author) => authorStore.add(author);

  addList = (list) => listStore.add(list);

  removeList = (id) => listStore.delete(id);

  addTaskToList = (id, taskId) => listStore.update(id, { taskIds: arrayUnion(taskId) });

  removeTaskFromList = (id, taskId) => listStore.update(id, { taskIds: arrayRemove(taskId) });

  updateListsTasksOrder = (sourceId, sourceTaskids, destinationId, destinationTaskIds) =>
    Promise.all([
      listStore.update(sourceId, { taskIds: sourceTaskids }),
      listStore.update(destinationId, { taskIds: destinationTaskIds })
    ]);

  getListsForBoard = (boardId) => listStore.getAllForParent('boardId', boardId);

  addBoard = (board) => boardStore.add(board);
  
  getBoardsForAuthor = (authorId) => boardStore.getAllForParent('authorId', authorId);

  getBoard = (id) => boardStore.get(id);

  removeBoard = (id) => boardStore.delete(id);

  updateTasksOnList = (id, taskIds) =>
    listStore.update(id, { taskIds, listOrder: taskIds });

  updateListOnBoard = (id, listIds) =>
    boardStore.update(id, { listIds, listOrder: listIds });

  updateListOrder = (id, listOrder) => boardStore.update(id, { listOrder });
}

class StoreFunctions {
  constructor(collection) {
    this.collection = collection;
    this.plural = collection.toLowerCase();
    this.singular = collection.toLowerCase().substring(0, collection.length-1);
  }

  add(resource) {
    return setDoc(doc(db, this.collection, resource.id), {
      ...resource,
      created: new Date(),
      updated: new Date()
    });
  }

  update(id, update) {
    return updateDoc(doc(db, this.collection, id), {
      ...update,
      updated: new Date()
    });
  }

  delete(id) {
    return deleteDoc(doc(db, this.collection, id));
  }

  async get(id) {
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

  async getAll() {
    const snap = await getDocs(collection(db, this.collection));
    const data = {};
    snap.forEach((doc) => {
      data[doc.id] = doc.data();
    });
    return data;
  }

  async getAllForParent(modelIdPropertyName, modelId) {
    const ref = collection(db, this.collection);
    const q = query(ref, where(modelIdPropertyName, '==', modelId));
    const querySnapshots = await getDocs(q);
    const data = {};
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
