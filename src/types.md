#### Task

```ts
interface Task {
  id: string;
  content: string;
  authorId: string;
  description?: string;
}
```

#### Author

```ts
interface Author {
  id: string;
  username: string;
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
}
```

#### List

```ts
interface List {
  id: string;
  title: string;
  taskIds: string;
  authorId: string;
}
```
