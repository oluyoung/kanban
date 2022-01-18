#### Task

```ts
interface Task {
  id: string;
  content: string;
  authorId: string;
  description?: string;
  created: Date;
  updated: Date;
}
```

#### Author

```ts
interface Author {
  id: string;
  username: string;
  created: Date;
}
```

#### Board

```ts
interface Board {
  id: string;
  title: string;
  listIds: string[];
  listOrder: string[];
  authorId: string;
  created: Date;
  updated: Date;
}
```

#### List

```ts
interface List {
  id: string;
  title: string;
  taskIds: string;
  authorId: string;
  created: Date;
  updated: Date;
}
```
