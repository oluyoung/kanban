import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Logout from '../components/Logout';
import Spinner from '../components/Spinner';
import { getAuthorBoards } from '../store/selectors';
import { logout as signOut, deleteBoard } from '../store/actions/author.creator';
import { getBoards, addBoard } from '../store/actions/board.creator';
import BoardList from '../components/BoardList';

const Container = styled.div`
  margin: auto;
  padding-top: 5vh;
  max-width: 720px;
  width: 90%;
`;
const Header = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1em;
`;
const YourBoardsText = styled.h1``;
const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
`;
const NewBoardButton = styled.a`
  display: block;
  color: white;
  font-size: 13px;
  font-weight: bold;
  background-color: #111;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;
const NoBoardsText = styled.h2``;
const NewBoardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-top: 1.5em;
`;
const NewBoardInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;
  &:focus {
    outline: none;
  }
`;
const NewBoardInputSubmit = styled.button`
  outline: none;
  border: 0;
  border-radius: 5px;
  background-color: #55e360;
  color: #111;
  font-weight: bold;
  cursor: pointer;
  display: block;
  padding: 5px 12px;
  margin-right: 10px;
`;
const NewBoardInputCancel = styled.a`
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: black;
`;

const Boards = (props) => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [title, setTitle] = useState('');
  const inputRef = useRef();
  const author = useSelector(state => state.authors.currentAuthor);
  const isLoading = useSelector(state => state.boards.loading);
  const boards = useSelector(getAuthorBoards);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!author) {
      history.push(`/`);
      return;
    }
    dispatch(getBoards());
  }, []);

  const logout = () => {
    dispatch(signOut());
    history.push(`/`);
  }

  const handleSubmit = () => {
    if (Boolean(title.trim())) {
      dispatch(addBoard(title));
      setIsInputOpen(false);
    } else {
      inputRef.current.focus();
    }
  };

  const removeBoard = (id) => {
    const conf = window.confirm('Are you sure you want to delete this board?');
    if (conf) dispatch(deleteBoard(id));
  };

  return (
    <Container>
      <Header>
        <YourBoardsText>Your boards</YourBoardsText>
        <HeaderButtons>
          <NewBoardButton onClick={() =>  setIsInputOpen(true)}>Add Board</NewBoardButton>
          <Logout logout={logout} />
        </HeaderButtons>
      </Header>
      {isLoading ? (
        <Spinner />
      ) : boards.length ?
        (<BoardList boards={boards} deleteBoard={removeBoard} />) :
        (<NoBoardsText>You have no boards yet</NoBoardsText>)
      }
      {isInputOpen ?
        <NewBoardContainer>
          <NewBoardInput
            ref={inputRef}
            placeholder="My New Project"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <NewBoardInputSubmit onClick={handleSubmit}>Add Board</NewBoardInputSubmit>
          <NewBoardInputCancel onClick={() => setIsInputOpen(false)}>Cancel</NewBoardInputCancel>
        </NewBoardContainer> :
        null}
    </Container>
  );
}

export default Boards;
