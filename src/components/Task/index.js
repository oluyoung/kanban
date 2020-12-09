import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

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
`;
const DeleteBtn = styled.a`
  color: red;
  display: inline-block;
`

export default class Task extends PureComponent {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            {this.props.task.content}
            <DeleteBtn onClick={() => this.props.removeTask(this.props.task.id)}>Del</DeleteBtn>
          </Container>
        )}
      </Draggable>
    );
  }
}
