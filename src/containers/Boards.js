import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Logout from '../components/Logout';
import Spinner from '../components/Spinner';
import { getAuthorBoards } from '../store/selectors';
import { logout } from '../store/actions/author.creator';
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
      return;
    }
    this.props.getBoards();
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
    return (
      <Container>
        <Header>
          <YourBoardsText>Your boards</YourBoardsText>
          <HeaderButtons>
            <NewBoardButton onClick={() => this.setState({isInputOpen: true})}>Add Board</NewBoardButton>
            <Logout logout={this.logout} />
          </HeaderButtons>
        </Header>
        {this.props.isLoading ? (
          <Spinner />
        ) : this.props.boards.length ?
          (<BoardList boards={this.props.boards} />) :
          (<NoBoardsText>You have no boards yet</NoBoardsText>)
        }
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
  addBoard: (title) => dispatch(addBoard(title)),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
