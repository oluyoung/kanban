const initialState = {
  authors: {
    author1: {
      id: 'author1',
      username: 'yomi'
    },
    author2: {
      id: 'author2',
      username: 'tim'
    }
  },
  currentAuthorId: 'author1',
  currentAuthor: {
    id: 'author1',
    username: 'yomi'
  }
};

export default function authorReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
