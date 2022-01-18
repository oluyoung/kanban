import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../components/Spinner';
import { addAuthor, getAuthors, setCurrentAuthor, logout } from '../store/actions/author.creator';
import { getAuthorsList, getAuthorUsernames } from '../store/selectors';

const Container = styled.div`
  margin: auto;
  padding-top: 5vh;
  max-width: 540px;
  width: 90%;
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
const NoAuthorsText = styled.h2``;
const AuthorsListView = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
`;
const AuthorItem = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border-radius: 5px;
  cursor: pointer;
  flex-flow: column nowrap;
  width: calc(25% - 1.5em);
  margin-right: 1.5em;
  margin-bottom: 1.5em;
  text-align: center;
  position: relative;
  background-color: var(--dark-pink);
  box-shadow: 1px 2px 5px #111;

  @media (max-width: 640px) {
    width: calc(33.3333% - 1em);
    margin-right: 1em;
    margin-bottom: 1em;
  }
`;
const AuthorIcon = styled.span`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  background: var(--white);
  border: 2px solid var(--pink-border);
  border-radius: 50%;
  padding: 1em;
  width: 55px;
  height: 55px;
  color: var(--dark-pink);
  transform-style: preserve-3d;
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: -4px;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--dark-pink);
    border-radius: inherit;
    box-shadow: 0 0 0 2px var(--pink-border);
    transform: translate3d(0, 0.75em, -1em);
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
  }
  &:hover {
    background: var(--white);
    transform: translate(0, 0.25em);
    &::before {
      box-shadow: 0 0 0 2px var(--pink-border);
      transform: translate3d(0, 0.5em, -1em);
    }
  }
  &:active {
    background: var(--white);
    transform: translate(0em, 0.75em);
    &::before {
      box-shadow: 0 0 0 2px var(--pink-border);
      transform: translate3d(0, 0, -1em);
    }
  }
`;
const NewAuthorContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-top: 1.5em;
`;
const AuthorName = styled.span`
  display: inline-block;
  font-size: 18px;
  margin-top: 10px;
  text-transform: capitalize;
  text-align: center;
  color: #111;
  font-weight: bold;
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
  background-color: #fff;
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

  componentDidMount() {
    this.props.logout();
    this.props.getAuthors();
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
      return (
      <AuthorItem key={author.id} onClick={() => this.setAuthor(author.id)}>
        <AuthorIcon>
          <FontAwesomeIcon icon={faUser} size="3x" />
        </AuthorIcon>
        <AuthorName>{author.username}</AuthorName>
      </AuthorItem>);
    });

    return (
      <Container>
        <Header>
          <AuthorsText>Users</AuthorsText>
          <NewAuthorButton onClick={() => this.setState({isInputOpen: true})}>Add Author</NewAuthorButton>
        </Header>
        {this.props.isLoading ? (
          <Spinner />
        ) : this.props.authors.length ?
          (<AuthorsListView>{authorsListView}</AuthorsListView>) :
          (<NoAuthorsText>There are no authors yet</NoAuthorsText>)
        }
        {this.state.isInputOpen ?
          <NewAuthorContainer>
            <NewAuthorInput
              ref={this.inputRef}
              placeholder="Tunde"
              value={this.state.value}
              onChange={(event) => this.setState({username: event.target.value})} />
            <NewAuthorInputSubmit onClick={this.handleSubmit}>Add Author</NewAuthorInputSubmit>
            <NewAuthorInputCancel onClick={() => this.setState({ isInputOpen: false })}><FontAwesomeIcon icon={faTimes} /></NewAuthorInputCancel>
          </NewAuthorContainer> :
          null}
      </Container>
      );
  }
}

const mapStateToProps = state => ({
  authors: getAuthorsList(state),
  usernames: getAuthorUsernames(state),
  isLoading: state.authors.loading,
});

const mapDispatchToProps = dispatch => ({
  addAuthor: (username) => dispatch(addAuthor(username)),
  getAuthors: () => dispatch(getAuthors()),
  setCurrentAuthor: (id) => dispatch(setCurrentAuthor(id)),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
