import React from 'react';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  getTask,
  updateContent as updateTaskContent,
  updateDescription as updateTaskDescription,
  removeTask as deleteTask
} from '../../store/actions/task.creator';
import ContentInput from '../ContentInput';
import DescriptionInput from '../DescriptionInput';

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
  white-space: pre-wrap;
  min-height: 150px;
  max-height: 300px;
  overflow-y: scroll;
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

const TaskModal = (props) => {
  const [isContentInputOpen, setIsContentInputOpen] = React.useState(false);
  const [isDescriptionInputOpen, setIsDescriptionInputOpen] = React.useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const { taskId, boardId } = useParams();
  const task = useSelector((state) => state.tasks.currentTask);

  React.useEffect(() => {
    if (taskId) {
      dispatch(getTask(taskId, boardId));
    }
  }, [dispatch, taskId, boardId]);

  const closeModal = () => {
    props.closeModal();
    history.push(`/b/${boardId}`);
  }

  const updateContent = (content) => {
    if (Boolean(content.trim())) {
      dispatch(updateTaskContent(task.id, content));
    } else {
      dispatch(updateTaskContent(task.id, task.content));
    }
    setIsContentInputOpen(false);
  }

  const updateDescription = (description) =>  {
    dispatch(updateTaskDescription(task.id, description));
    setIsDescriptionInputOpen(false);
  }

  const removeTask = () => {
    const result = window.confirm('Are you sure you want to remove this task?');
    if (result) {
      dispatch(deleteTask(task));
      closeModal();
    }
  }

  const closeDescriptionInput = () => setIsDescriptionInputOpen(false);
  const closeContentInput = () => setIsContentInputOpen(false);

  
  return (
    <>
    {task &&
    <Modal
      isOpen
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}>
      <Container>
        <Close onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </Close>
        <Header>
          {isContentInputOpen ?
            <ContentInput
              content={task.content}
              updateContent={updateContent}
              closeInput={closeContentInput} />:
            <Title>{task.content}
              <Edit onClick={() => setIsContentInputOpen(true)}>Edit</Edit>
            </Title>}
        </Header>
        <DescriptionContainer>
          <DescriptionTitle>Description
            <Edit
              hidden={task.description ? isDescriptionInputOpen : true}
              onClick={() => setIsDescriptionInputOpen(true)}>Edit</Edit>
          </DescriptionTitle>
          {task.description && !isDescriptionInputOpen ?
            <Description>{task.description}</Description> :
            <DescriptionInput
              description={task.description}
              updateDescription={updateDescription}
              closeInput={closeDescriptionInput}
            />}
        </DescriptionContainer>
        <DeleteBtn onClick={removeTask}>Delete Task <FontAwesomeIcon icon={faTrash} /></DeleteBtn>
      </Container>
    </Modal>}
    </>
  );
}

// const mapStateToProps = state => ({
//   task: state.tasks.currentTask
// });

// const mapDispatchToProps = dispatch => ({
//   getTask: (taskId, boardId) => dispatch(getTask(taskId, boardId)),
//   removeTask: (task) => dispatch(removeTask(task)),
//   updateContent: (taskId, content) => dispatch(updateContent(taskId, content)),
//   updateDescription: (taskId, description) => dispatch(updateDescription(taskId, description))
// });

export default withRouter(TaskModal);