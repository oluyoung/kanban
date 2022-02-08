import { initializeApp } from "firebase/app";
import { query, where, collection, getDoc, getDocs, deleteDoc, setDoc, doc, updateDoc, getFirestore } from "firebase/firestore";
import { AuthorModel, BoardModel, ListModel, TaskModel } from "../types";

const firebaseConfig = {
  apiKey: "AIzaSyBjdiq3t1znF8H5t76NEWHzCC3Qf2ahNJY",
  authDomain: "one-kanban.firebaseapp.com",
  projectId: "one-kanban",
  storageBucket: "one-kanban.appspot.com",
  messagingSenderId: "421622584994",
  appId: "1:421622584994:web:6a2abb72912575ce0f69fb",
  measurementId: "G-HSDYPKCVE5"
};

initializeApp(firebaseConfig);

const db = getFirestore();

const TASKS = 'tasks';
const AUTHORS = 'authors';
const BOARDS = 'boards';
const LISTS = 'lists';

type Collection = 'tasks' | 'authors' | 'boards' | 'lists';
type Resource = Partial<TaskModel> | Partial<BoardModel> | Partial<ListModel> | Partial<AuthorModel>;


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

export const taskStore = new StoreFunctions(TASKS);
export const authorStore = new StoreFunctions(AUTHORS);
export const boardStore = new StoreFunctions(BOARDS);
export const listStore = new StoreFunctions(LISTS);
