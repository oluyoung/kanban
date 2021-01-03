import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';

const Container = styled.p`
  margin: 0;
  border: 1px solid lightgrey;
  transtion: all 0.2s ease;
  background-color: white;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  width: 95%;
  display: inline-flex;
  justify-content: space-between;
  box-shadow: 1px 1px 3px #ccc;
  &:hover,
  &:focus {
    background-color: #e0e0e0;
  }

  @media (max-width: 1024px) {
    width: 94%;
  }

  @media (max-width: 768px) {
    width: 95%;
  }

  @media (max-width: 480px) {
    width: 93%;
  }
`;
const EditPencil = styled.span``;

class Task extends PureComponent {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            onClick={() => {
              this.props.history.push(`/b/${this.props.boardId}/l/${this.props.listId}/t/${this.props.task.id}`)
            }}
          >
            {this.props.task.content}
            <EditPencil><FontAwesomeIcon icon={faPenAlt} /></EditPencil>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default withRouter(Task);