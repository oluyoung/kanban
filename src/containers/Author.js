import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { addAuthor, setCurrentAuthor } from '../store/actions/author.creator';
import { getAuthorsList, getAuthorUsernames } from '../store/selectors';

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
const AuthorsText = styled.h1``;
const NewAuthorButton = styled.a`
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
const AuthorsListView = styled.div``;
const BoardsItem = styled.a`
  display: block;
  padding: 10px 0;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;
const NewAuthorContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-top: 1.5em;
`;
const NewAuthorInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;
  &:focus {
    outline: none;
  }
`;
const NewAuthorInputSubmit = styled.button`
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
const NewAuthorInputCancel = styled.a`
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: black;
`;

class User extends React.Component {
  state = {
    isInputOpen: false,
    username: ''
  };

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  handleSubmit = () => {
    if (Boolean(this.state.username.trim())) {
      if (
        this.props.usernames.includes(this.state.username) ||
        this.props.usernames.includes(this.state.username.toLowerCase())
        ) {
        alert('Username already exists');
        return;
      } else {
        this.props.addAuthor(this.state.username);
        this.setState({isInputOpen: false})
      }
    } else {
      this.inputRef.current.focus();
    }
  };

  setAuthor = (authorId) => {
    this.props.setCurrentAuthor(authorId);
    this.props.history.push(`/boards`);
  }

  render() {
    const authorsListView = this.props.authors.map(author => {
      return <BoardsItem key={author.id} onClick={() => this.setAuthor(author.id)}>{author.username}</BoardsItem>
    });

    return (
      <Container>
        <Header>
          <AuthorsText>Users</AuthorsText>
          <NewAuthorButton onClick={() => this.setState({isInputOpen: true})}>Add Author</NewAuthorButton>
        </Header>
        {this.props.authors.length ?
          (<AuthorsListView>{authorsListView}</AuthorsListView>) :
          (<NoBoardsText>There are no authors yet</NoBoardsText>)}
        {this.state.isInputOpen ?
          <NewAuthorContainer>
            <NewAuthorInput
              ref={this.inputRef}
              placeholder="Tunde"
              value={this.state.value}
              onChange={(event) => this.setState({username: event.target.value})} />
            <NewAuthorInputSubmit onClick={this.handleSubmit}>Add Author</NewAuthorInputSubmit>
            <NewAuthorInputCancel onClick={() => this.setState({isInputOpen: false})}><FontAwesomeIcon icon={faTimes} /></NewAuthorInputCancel>
          </NewAuthorContainer> :
          null}
      </Container>
      );
  }
}

const mapStateToProps = state => ({
  authors: getAuthorsList(state),
  usernames: getAuthorUsernames(state)
});

const mapDispatchToProps = dispatch => ({
  addAuthor: (username) => dispatch(addAuthor(username)),
  setCurrentAuthor: (id) => dispatch(setCurrentAuthor(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
