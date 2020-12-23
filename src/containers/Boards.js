import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getAuthorBoards } from '../store/selectors';
import { addBoard, getBoards } from '../store/actions/board.creator';

const Container = styled.div`
  margin: auto;
  margin-top: 5vh;
  max-width: 540px;
`;
const Header = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1em;
`;
const YourBoardsText = styled.h1``;
const NewBoardButton = styled.a`
  display: block;
  color: white;
  font-size: 13px;
  font-weight: bold;
  background-color: #111;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
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
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
`;
const NewBoardInputCancel = styled.button`
  border: 0;
  background-color: transparent;
  color: red;
  padding: 5px;
  margin-left: 10px;
  cursor: pointer;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

class Boards extends Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  state = {
    isInputOpen: false,
    title: ''
  };

  componentDidMount() {
    this.props.getBoards();
  }

  componentDidUpdate() {
    if (this.state.isInputOpen) {
      this.inputRef.current.focus();
    }
  }

  handleSubmit = () => {
    if (Boolean(this.state.title.trim())) {
      this.props.addBoard(this.state.title);
      this.setState({isInputOpen: false})
    } else {
      this.inputRef.current.focus();
    }
  };

  render() {
    const boardsListView = this.props.boards.map(board => {
      return <Link key={board.id} to={`/b/${board.id}`} component={(props) => {
        return <BoardItem {...props}>{board.title}</BoardItem>
      }} />;
    });

    return (
      <Container>
        <Header>
          <YourBoardsText>Your boards</YourBoardsText>
          <NewBoardButton onClick={() => this.setState({isInputOpen: true})}>Add Board</NewBoardButton>
        </Header>
        {this.props.boards.length ?
          (<BoardsListView>{boardsListView}</BoardsListView>) :
          (<NoBoardsText>You have no boards yet</NoBoardsText>)}
        {this.state.isInputOpen ?
          <NewBoardContainer>
            <NewBoardInput
              ref={this.inputRef}
              placeholder="My New Project"
              value={this.state.value}
              onChange={(event) => this.setState({title: event.target.value})} />
            <NewBoardInputSubmit onClick={this.handleSubmit}>Add Board</NewBoardInputSubmit>
            <NewBoardInputCancel onClick={() => this.setState({isInputOpen: false})}>Cancel</NewBoardInputCancel>
          </NewBoardContainer> :
          null}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  author: state.authors.currentAuthor,
  boards: getAuthorBoards(state, state.authors.currentAuthorId),
});

const mapDispatchToProps = dispatch => ({
  getBoards: () => dispatch(getBoards()),
  addBoard: (title) => dispatch(addBoard(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
