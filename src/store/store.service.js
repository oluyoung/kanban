import firebase from 'firebase';
import 'firebase/firestore';

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

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

class StoreService {
  saveTasks() {}

  addTask = (task) => {
    return db.collection('tasks').doc(task.id).set({...task});
  }

  updateTask(id, data) {
    return db.collection('tasks').doc(id).update({...data});
  }

  removeTask(id) {
    return db.collection('tasks').doc(id).delete();
  }

  getTasks() {}
  getTask() {}
  saveBoard() {}
  getBoards() {}
  getBoard() {}
  saveList() {}
  getLists() {}
  getList() {}
}

const storeService = new StoreService();
export default storeService;
