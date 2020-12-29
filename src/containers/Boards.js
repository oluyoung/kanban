import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Logout from '../components/Logout';
import { getAuthorBoards } from '../store/selectors';
import { logout } from '../store/actions/author.creator';
import { addBoard } from '../store/actions/board.creator';

function generateRandomColor() {
  let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  if (randomColor.length !== 7){ // In any case, the color code is invalid
    randomColor = generateRandomColor();
  }
  return randomColor;
}

const Container = styled.div`
  margin: auto;
  margin-top: 5vh;
  max-width: 720px;
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
`;
const BoardItemText = styled.span`
  position: absolute;
  top: 7px;
  left: 7px;
  color: #fff;
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
    if (!this.props.author) {
      this.props.history.push(`/`);
    }
  }

  logout = () => {
    this.props.logout();
    this.props.history.push(`/`);
  }

  handleSubmit = () => {
    if (Boolean(this.state.title.trim())) {
      this.props.addBoard(this.state.title);
      this.setState({isInputOpen: false});
    } else {
      this.inputRef.current.focus();
    }
  };

  render() {
    const boardsListView = this.props.boards.map(board => {
      return <Link key={board.id} to={`/b/${board.id}`} component={(props) => {
        return (
          <BoardItem {...props} style={{backgroundColor: generateRandomColor()}}>
            <BoardItemText>{board.title}</BoardItemText>
          </BoardItem>
        );
      }} />;
    });

    return (
      <Container>
        <Header>
          <YourBoardsText>Your boards</YourBoardsText>
          <HeaderButtons>
            <NewBoardButton onClick={() => this.setState({isInputOpen: true})}>Add Board</NewBoardButton>
            <Logout logout={this.logout} />
          </HeaderButtons>
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
  addBoard: (title) => dispatch(addBoard(title)),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
