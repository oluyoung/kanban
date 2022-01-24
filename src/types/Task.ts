export interface TaskModel {
  id: string;
  content: string;
  authorId: string;
  description?: string;
  listId: string;
  created: Date;
  updated: Date;
}
