import {
  AuthorModel,
  BoardModel,
  TaskModel,
  ListModel,
} from './';
import * as ActionType from '../store/actions/constants';

export interface Action {
  type: keyof typeof ActionType;
  [key: string]: any;
}

export interface AuthorsState {
  authors: {
    [key: string]: AuthorModel;
  },
  currentAuthorId: string | undefined;
  currentAuthor: AuthorModel | undefined;
  loading: boolean;
}

export interface BoardsState {
  boards: {
    [key: string]: BoardModel;
  },
  currentBoardId: string | undefined;
  currentBoard: BoardModel | undefined;
  loading: boolean;
}

export interface TasksState {
  tasks: {
    [key: string]: TaskModel;
  },
  currentTaskId: string | undefined;
  currentTask: TaskModel | undefined;
}

export interface ListsState {
  lists: {
    [key: string]: ListModel;
  };
  listIdWithOpenTaskInput: string;
}

export interface RootState { 
  authors: AuthorsState;
  boards: BoardsState;
  tasks: TasksState;
  lists: ListsState;
}

export type GetStore = () => RootState;
