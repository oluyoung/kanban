import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Boards from './containers/Boards';
import Board from './containers/Board';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Boards} />
          <Route exact path="/b/:boardId" component={Board} />
          <Route exact path="/b/:boardId/l/:listId/t/:taskId" component={Board} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
