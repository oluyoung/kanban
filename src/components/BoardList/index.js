import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

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

function generateRandomColor() {
  let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  if (randomColor.length !== 7){ // In any case, the color code is invalid
    randomColor = generateRandomColor();
  }
  return randomColor;
}


class BoardList extends PureComponent {
  selectBoard = (boardId) => {
    this.props.history.push(`/b/${boardId}`);
  }

  render() {
    const boardsListView = this.props.boards.map(board => {
      return (
        <BoardItem
          key={board.id}
          onClick={() => this.selectBoard(board.id)}
          style={{backgroundColor: generateRandomColor()}}>
          <BoardItemText>{board.title}</BoardItemText>
        </BoardItem>
      );
    });

    return <BoardsListView>{boardsListView}</BoardsListView>;
  }
}

export default withRouter(BoardList);