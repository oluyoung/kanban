const authorKey = 'KB_author';
const boardKey = 'KB_board';

class LocalStorageService {
  setAuthor = (author) => {
    localStorage.setItem(authorKey, JSON.stringify(author));
  }
  
  setBoard = (boardId) => {
    localStorage.setItem(boardKey, JSON.stringify(boardId));
  }

  getAuthor = () => {
    return JSON.parse(localStorage.getItem(authorKey));
  }
  
  getBoard = () => {
    return JSON.parse(localStorage.getItem(boardKey));
  }

  logout = () => {
    localStorage.removeItem(authorKey);
    localStorage.removeItem(boardKey);
  }
}

const localService = new LocalStorageService();
export default localService;
