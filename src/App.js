import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Boards from './containers/Boards';
import Board from './containers/Board';
import Author from './containers/Author';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Author} />
          <Route exact path="/boards" component={Boards} />
          <Route exact path="/b/:boardId" component={Board} />
          <Route exact path="/b/:boardId/l/:listId/t/:taskId" component={Board} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
