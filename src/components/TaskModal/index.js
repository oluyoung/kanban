import React from 'react';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from "react-markdown";
import styled from 'styled-components';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faCopy } from '@fortawesome/free-solid-svg-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ThreeDButton from '../ThreeDButton';
import {
  getTask,
  updateContent as updateTaskContent,
  updateDescription as updateTaskDescription,
  removeTask as deleteTask
} from '../../store/actions/task.creator';
import ContentInput from '../ContentInput';
import DescriptionInput from '../DescriptionInput';
import { cornflower, babyBlue, navyBlue } from '../../colors';

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
  display: flex;
  align-items: center;
  justify-content: space-between;
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
const Description = styled.div`
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

  const copy = () => {
    navigator.clipboard.writeText(task.description)
      .then(() => console.log('copied'))
      .catch((error) => console.error(error));
  };

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
          <DescriptionTitle>
            <span>
              Description
              <Edit
                hidden={task.description ? isDescriptionInputOpen : true}
                onClick={() => setIsDescriptionInputOpen(true)}>Edit
              </Edit>
            </span>
            <span>
              {task.description ? (
                <ThreeDButton
                  onClick={copy}
                  icon={faCopy}
                  bgColor={babyBlue}
                  iconColor={cornflower}
                  shadow={navyBlue}
                />
              ) : null}
            </span>
          </DescriptionTitle>
          {task.description && !isDescriptionInputOpen ?
            <Description>
              <ReactMarkdown
                children={task.description}
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={materialLight}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              />
            </Description> :
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

export default withRouter(TaskModal);