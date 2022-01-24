import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AuthorBoards } from '../../store/selectors';
import Delete3DButton from '../Delete3DButton';

interface Props {
  boards: AuthorBoards[];
  deleteBoard: (id: string) => void;
}

const BoardsListView = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
`;
const BoardItem = styled.div`
  display: block;
  font-weight: bold;
  font-size: 16px;
  position: relative;
  width: calc(33.3333% - 1.5em);
  margin-right: 1.5em;
  background-color: #212121;
  min-height: 85px;
  height: 85px;
  margin-bottom: 1.5em;
  border-radius: 3px;
  cursor: pointer;

  @media (max-width: 640px) {
    width: calc(50% - 1em);
    margin-right: 1em;
    margin-bottom: 1em;
  }
`;
const Link = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  height: 85px;
`;
const BoardItemText = styled.span`
  position: absolute;
  top: 7px;
  left: 7px;
  color: #fff;
`;

const BoardList = (props: Props) => {
  const history = useHistory();
  const selectBoard = (boardId: string) => history.push(`/b/${boardId}`);

  const generateRandomColor = useCallback(() => {
    let randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    if (randomColor.length !== 7){ // In any case, the color code is invalid
      randomColor = generateRandomColor();
    }
    return randomColor;
  }, []);

  return (
    <BoardsListView>
      {props.boards.map(board => (
        <BoardItem
          key={board.id}
          style={{backgroundColor: generateRandomColor()}}>
          <Link onClick={() => selectBoard(board.id)}>
            <BoardItemText>{board.title}</BoardItemText>
          </Link>
          <Delete3DButton onClick={() => props.deleteBoard(board.id)} />
        </BoardItem>
      ))}
    </BoardsListView>
  );
};

export default BoardList;
