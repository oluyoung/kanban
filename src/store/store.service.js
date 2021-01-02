import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyArMVNWhoG9LhcjU_UvUTFo0r-0XGVlXDk',
  authDomain: 'six-task.firebaseapp.com',
  databaseURL: 'https://six-task.firebaseio.com',
  projectId: 'six-task',
  storageBucket: 'six-task.appspot.com',
  messagingSenderId: '28885894950',
  appId: '1:28885894950:web:e30d98fcfbcf96ba8323e7',
  measurementId: 'G-QJLXFXG8JZ'
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

class StoreService {
  getTasks(boardId) {
    return new Promise((resolve, reject) => {
      db.collection('tasks').where('boardId', '==', boardId).get()
        .then(() => {})
        .catch((error) => reject(error));
    })
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

  getLists() {}
  getList() {}
  saveBoard() {}
  getBoards() {}
  getBoard() {}
}

const storeService = new StoreService();
export default storeService;
