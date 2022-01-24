import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { TaskModel } from '../../types';

interface Props {
  task: TaskModel;
  index: number;
  boardId: string;
  listId: string;
}

const Container = styled.p<{ isDragging: boolean }>`
  margin: 0;
  border: 1px solid lightgrey;
  transtion: all 0.2s ease;
  background-color: white;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  box-shadow: 1px 1px 3px #ccc;
  &:hover,
  &:focus {
    background-color: #e0e0e0;
  }
`;
const EditPencil = styled.span``;

const Task = (props: Props) => {
  const history = useHistory();
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          onClick={() => {
            history.push(`/b/${props.boardId}/l/${props.listId}/t/${props.task.id}`)
          }}
        >
          {props.task.content}
          {props.task.description ? <EditPencil><FontAwesomeIcon icon={faPenAlt} /></EditPencil> : null}
        </Container>
      )}
    </Draggable>
  );

}

export default Task;
