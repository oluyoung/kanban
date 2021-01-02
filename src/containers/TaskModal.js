import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getTask, updateContent, updateDescription, removeTask } from '../store/actions/task.creator';
import ContentInput from '../components/ContentInput';
import DescriptionInput from '../components/DescriptionInput';

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
const Close = styled.a`
  position: absolute;
  top: 16px;
  right: 16px;
  color: #111;
  cursor: pointer;
`;
const Header = styled.div`
  margin-bottom: 2em;
  height: 50px;
`;
const Title = styled.h2``;
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
const Description = styled.pre`
  background-color: #fafafa;
  padding: 10px;
  border-radius: 5px;
  font-family: arial;
`;
const DeleteBtn = styled.a`
  color: red;
  display: inline-block;
  padding: 10px 0;
  border-radius: 5px;
  margin-top: 1em;
  font-weight: bold;
  cursor: pointer;
`;

class TaskModal extends React.Component {
  state = {
    isContentInputOpen: false,
    isDescriptionInputOpen: false
  };

  componentDidMount() {
    if (this.props.match.params.taskId) {
      this.props.getTask(this.props.match.params.taskId, this.props.match.params.boardId);
    }
  }

  closeModal = () => {
    this.props.closeModal();
    this.props.history.push(`/b/${this.props.match.params.boardId}`);
  }

  updateContent = (content) => {
    if (Boolean(content.trim())) {
      this.props.updateContent(this.props.task.id, content);
    } else {
      this.props.updateContent(this.props.task.id, this.props.task.content);
    }
    this.setState({isContentInputOpen: false});
  }

  updateDescription = (description) =>  {
    this.props.updateDescription(this.props.task.id, description);
    this.setState({isDescriptionInputOpen: false});
  }

  removeTask = () => {
    const result = window.confirm('Are you sure you want to remove this task?');
    if (result) {
      this.props.removeTask(this.props.task);
      this.closeModal();
    }
  }

  closeDescriptionInput = () => this.setState({isDescriptionInputOpen: false});
  closeContentInput = () => this.setState({isContentInputOpen: false});

  render() {
    return (
      <>
      {this.props.task &&
      <Modal
        isOpen
        onRequestClose={this.closeModal}
        style={customStyles}
        ariaHideApp={false}>
        <Container>
          <Close onClick={this.closeModal}>
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </Close>
          <Header>
            {this.state.isContentInputOpen ?
              <ContentInput
                content={this.props.task.content}
                updateContent={this.updateContent}
                closeInput={this.closeContentInput} />:
              <Title>{this.props.task.content}
                <Edit onClick={() => this.setState({isContentInputOpen: true})}>Edit</Edit>
              </Title>}
          </Header>
          <DescriptionContainer>
            <DescriptionTitle>Description
              <Edit
                hidden={this.props.task.description ? this.state.isDescriptionInputOpen : true}
                onClick={() => this.setState({isDescriptionInputOpen: true})}>Edit</Edit>
            </DescriptionTitle>
            {this.props.task.description && !this.state.isDescriptionInputOpen ?
              <Description>{this.props.task.description}</Description> :
              <DescriptionInput
                description={this.props.task.description}
                updateDescription={this.updateDescription}
                closeInput={this.closeDescriptionInput}
              />}
          </DescriptionContainer>
          <DeleteBtn onClick={this.removeTask}>Delete Task <FontAwesomeIcon icon={faTrash} /></DeleteBtn>
        </Container>
      </Modal>}
      </>
    );
  }
}

const mapStateToProps = state => ({
  task: state.tasks.currentTask
});

const mapDispatchToProps = dispatch => ({
  getTask: (taskId, boardId) => dispatch(getTask(taskId, boardId)),
  removeTask: (task) => dispatch(removeTask(task)),
  updateContent: (taskId, content) => dispatch(updateContent(taskId, content)),
  updateDescription: (taskId, description) => dispatch(updateDescription(taskId, description))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskModal));