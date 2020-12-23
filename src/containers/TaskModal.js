import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { getTask, updateContent, updateDescription } from '../store/actions/task.creator';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '100%',
    maxWidth: '640px',
    transform: 'translate(-50%, -50%)',
    padding: '0'
  }
};

const Container = styled.div`
  background-color: #f1f4f5;
  position: relative;
  padding: 20px;
`;
const Header = styled.div`
  margin-bottom: 2em;
  height: 50px;
`;
const Title = styled.h2``;
const TitleInput = styled.input`
  border: 0;
  border-bottom: 1px solid;
  background: transparent;
  padding: 1px;
  font-weight: bold;
  font-size: 1.72em;
  width: 80%;
  outline: none;
`;
const DescriptionTitle = styled.h4`
  margin-bottom: 1em;
`;
const DescriptionContainer = styled.div``;
const Edit = styled.button`
  border: 0;
  border-radius: 5px;
  padding: 5px 8px;
  background-color: #ccc;
  margin-left: 10px;
  font-weight: bold;
  cursor: pointer;
`;
const DescriptionBox = styled.textarea`
  resize: none;
  width: 96%;
  height: 100px;
  border-radius: 5px;
  padding: 10px;
  font-family: sans-serif;
  font-size: 16px;
`;
const Description = styled.p``;
const Buttons = styled.div`
  margin-top: 10px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;
const Save = styled.button`
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
const Cancel = styled.a`
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: black;
`;
const Close = styled.a`
  position: absolute;
  top: 16px;
  right: 16px;
  color: #111;
`;

class TaskModal extends React.Component {
  state = {
    modalIsOpen: false,
    content: '',
    isContentInputOpen: false,
    description: '',
    isDescriptionInputOpen: false
  };

  componentDidMount() {
    if (this.props.match.params.taskId) {
      this.props.getTask(this.props.match.params.taskId);
      this.setState({modalIsOpen: true});
    }
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
    this.props.history.push(`/b/${this.props.match.params.boardId}`);
  }

  updateContent = () => {
    if (Boolean(this.state.content.trim())) {
      this.props.updateContent(this.props.task.id, this.state.content);
    } else {
      this.props.updateContent(this.props.task.id, this.props.task.content);
    }
    this.setState({isContentInputOpen: false});
  }

  updateDescription = () =>  {
    if (Boolean(this.state.description.trim())) {
      this.props.updateDescription(this.props.task.id, this.state.description);
    } else {
      this.props.updateDescription(this.props.task.id, this.props.task.description);
    }
    this.setState({isDescriptionInputOpen: false});
  }

  render() {
    return (
      <>
      {this.props.task &&
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        ariaHideApp={false}>
          <Container>
            <Close onClick={this.closeModal}>
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </Close>
            <Header>
              {this.state.isContentInputOpen ?
                (<>
                <TitleInput value={this.state.content} onChange={event => this.setState({content: event.target.value})} />
                <Buttons>
                  <Save onClick={this.updateContent}>Save</Save>
                  <Cancel onClick={() => this.setState({isContentInputOpen: false})}>
                    <FontAwesomeIcon icon={faTimes} />
                  </Cancel>
                </Buttons>
                </>) :
                (<Title>{this.props.task.content}
                  <Edit onClick={() => this.setState({isContentInputOpen: true})}>Edit</Edit>
                </Title>)}
            </Header>
            <DescriptionContainer>
              <DescriptionTitle>
                Description
                <Edit
                  hidden={this.state.isDescriptionInputOpen}
                  onClick={() => this.setState({isDescriptionInputOpen: true})}>Edit</Edit>
              </DescriptionTitle>
              {this.props.task.description && !this.state.isDescriptionInputOpen ?
              (<Description>{this.props.task.description}</Description>) :
              (<>
                <DescriptionBox
                  placeholder="Add a more detailed description..."
                  value={this.state.description}
                  onChange={event => this.setState({description: event.target.value})}>
                </DescriptionBox>
                <Buttons>
                  <Save onClick={this.updateDescription}>Save</Save>
                  <Cancel onClick={() => this.setState({isDescriptionInputOpen: false})}>
                    <FontAwesomeIcon icon={faTimes} />
                  </Cancel>
                </Buttons>
              </>)}
            </DescriptionContainer>
          </Container>
      </Modal>}
      </>
    );
  }
}

const mapStateToProps = state => ({
  task: state.modals.task
});

const mapDispatchToProps = dispatch => ({
  getTask: (taskId) => dispatch(getTask(taskId)),
  updateContent: (taskId, content) => dispatch(updateContent(taskId, content)),
  updateDescription: (taskId, description) => dispatch(updateDescription(taskId, description))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskModal));