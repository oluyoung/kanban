import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import localService from '../../store/local.service';

const BoardsListView = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
`;
const BoardItem = styled.a`
  display: block;
  font-weight: bold;
  font-size: 16px;
  position: relative;
  width: calc(33.3333% - 1.5em);
  margin-right: 1.5em;
  background-color: #212121;
  min-height: 85px;
  margin-bottom: 1.5em;
  border-radius: 3px;
  cursor: pointer;

  @media (max-width: 640px) {
    width: calc(50% - 1em);
    margin-right: 1em;
    margin-bottom: 1em;
  }
`;
const BoardItemText = styled.span`
  position: absolute;
  top: 7px;
  left: 7px;
  color: #fff;
`;

const BoardList = (props) => {
  const selectBoard = (boardId) => {
    localService.setBoard(boardId);
    props.history.push(`/b/${boardId}`);
  }

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
          onClick={() => selectBoard(board.id)}
          style={{backgroundColor: generateRandomColor()}}>
          <BoardItemText>{board.title}</BoardItemText>
        </BoardItem>
      ))}
    </BoardsListView>
  );
};

export default withRouter(BoardList);