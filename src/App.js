import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Boards from './containers/Boards';
import Board from './containers/Board';

function App() {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" component={Boards} />
        <Route exact path="/b/:boardId" component={Board} />
        <Route exact path="/b/:boardId/t/:taskId" component={Board} />
      </BrowserRouter>
    </>
  );
}

export default App;
