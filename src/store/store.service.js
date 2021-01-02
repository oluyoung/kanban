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
            return reject(new Error('No message exists'));
          }
        })
        .catch((error) => reject(error));
    });
  }

  saveBoard() {}
  getBoards() {}
  getBoard() {}
  saveList() {}
  getLists() {}
  getList() {}
}

const storeService = new StoreService();
export default storeService;
