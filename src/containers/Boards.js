import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getAuthorBoards } from '../store/selectors';

const Container = styled.div`
  margin: auto;
  margin-top: 5vh;
  max-width: 540px;
`;
const YourBoardsText = styled.h1`
  margin-bottom: 1em
`;
const NoBoardsText = styled.h2``;
const BoardsListView = styled.div``;
const BoardItem = styled.a`
  display: block;
  padding: 10px 0;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
`;

class Boards extends Component {
  render() {
    const boardsListView = this.props.boards.map(board => {
      return <Link key={board.id} to={`/${board.id}`} component={(props) => {
        return <BoardItem {...props}>{board.title}</BoardItem>
      }} />;
    });

    return (
      <Container>
        <YourBoardsText>Your boards</YourBoardsText>
        {this.props.boards.length ?
          (<BoardsListView>{boardsListView}</BoardsListView>) :
          (<NoBoardsText>You have no boards yet</NoBoardsText>)}
        {/** Add new board */}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  boards: getAuthorBoards(state, state.authors.currentAuthor),
});

export default connect(mapStateToProps)(Boards);
