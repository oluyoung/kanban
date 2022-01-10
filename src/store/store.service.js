import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA1HLWpOluRwFlWoV0n7QrbwBqh1FaBZsw",
  authDomain: "kanban-3e23d.firebaseapp.com",
  projectId: "kanban-3e23d",
  storageBucket: "kanban-3e23d.appspot.com",
  messagingSenderId: "335439680123",
  appId: "1:335439680123:web:373f0c527fcdb124bf48de"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

class StoreService {
  getTasksForBoard(boardId) {
    return this._getResourcesForModel('tasks', 'boardId', boardId);
  }

  addTask(task) {
    return db.collection('tasks').doc(task.id).set({...task});
  }

  updateTask(id, data) {
    return db.collection('tasks').doc(id).update({...data});
  }

  removeTask(id) {
    return db.collection('tasks').doc(id).delete();
  }

  getTask(id) {
    return new Promise((resolve, reject) => {
      db.collection('tasks').doc(id).get()
        .then((doc) => {
          if (doc.exists) {
            return resolve(doc.data());
          } else {
            return reject(new Error('No task with that id exists'));
          }
        })
        .catch((error) => reject(error));
    });
  }

  removeListTasks(ids) {
    return Promise.all(ids.map(id => db.collection('tasks').doc(id).delete()));
  }

  getAuthors() {
    return new Promise((resolve, reject) => {
      return db.collection('authors').get()
        .then((querySnapshots) => {
          const authors = {};
          querySnapshots.forEach((doc) => {
            authors[doc.id] = doc.data();
          });
          return resolve(authors);
        })
        .catch((error) => reject(error));
      });
  }

  addAuthor(author) {
    return db.collection('authors').doc(author.id).set({...author});
  }

  addList(list) {
    return db.collection('lists').doc(list.id).set({...list});
  }

  removeList(id) {
    return db.collection('lists').doc(id).delete();
  }

  addTaskToList(id, taskId) {
    return db.collection('lists').doc(id).update({
      taskIds: firebase.firestore.FieldValue.arrayUnion(taskId)
    });
  }

  removeTaskFromList(id, taskId) {
    return db.collection('lists').doc(id).update({
      taskIds: firebase.firestore.FieldValue.arrayRemove(taskId)
    });
  }

  updateListTasksOrder(id, taskIds) {
    return db.collection('lists').doc(id).update({ taskIds });
  }

  updateListsTasksOrder(sourceId, sourceTaskids, destinationId, destinationTaskIds) {
    return Promise.all([
      this.updateListTasksOrder(sourceId, sourceTaskids),
      this.updateListTasksOrder(destinationId, destinationTaskIds)
    ]);
  }

  getListsForBoard(boardId) {
    return this._getResourcesForModel('lists', 'boardId', boardId);
  }

  addBoard(board) {
    return db.collection('boards').doc(board.id).set({...board});
  }

  getBoardsForAuthor(authorId) {
    return this._getResourcesForModel('boards', 'authorId', authorId);
  }

  getBoard(id) {
    return new Promise((resolve, reject) => {
      db.collection('boards').doc(id).get()
        .then((doc) => {
          if (doc.exists) {
            return resolve(doc.data());
          } else {
            return reject(new Error('No board with that id exists'));
          }
        })
        .catch((error) => reject(error));
    });
  }

  addListToBoard(id, listIds) {
    return db.collection('boards').doc(id).update({
      listIds,
      listOrder: listIds
    });
  }

  removeListFromBoard(id, listIds) {
    return db.collection('boards').doc(id).update({
      listIds,
      listOrder: listIds
    });
  }

  updateListOrder(id, listOrder) {
    return db.collection('boards').doc(id).update({ listOrder });
  }

  _getResourcesForModel(collection, modelIdPropertyName, modelId) {
    return new Promise((resolve, reject) => {
      db.collection(collection).where(modelIdPropertyName, '==', modelId).get()
        .then((querySnapshots) => {
          const resources = {};
          querySnapshots.forEach((doc) => {
            resources[doc.id] = doc.data();
          });
          return resolve(resources);
        })
        .catch((error) => reject(error));
    });
  }
}

const storeService = new StoreService();
export default storeService;
