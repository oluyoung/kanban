import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Task from '../Task';
import AddTaskInput from '../AddTaskInput';

const Container = styled.div`
  margin: 8px;
  margin-top: 0;
  border: 1px solid lightgrey;
  border-radius: 5px;
  width: calc(20vw - 8px);
  background-color: #e6e9ed;
  display: flex;
  flex-flow: column nowrap;
`;
const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;
const Title = styled.h4`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;
  const Menu = styled.a`
  color: black;
  cursor: pointer;
`;
const AddTaskBtn = styled.button`
  outline: none;
  border: 0;
  background-color: transparent;
  font-weight: bold;
  color: #66686d;
  cursor: pointer;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: all 0.2s ease;
  background-color: #e6e9ed;
  flex-grow: 1;
  min-height: 100px;
`;

// optimize task list to not re-render on every update but only if there is a difference in tasks list handling
// can probably use PureComponent, and should extract into different components
class InnerList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false;
    }
    return true;
  }

  render() {
    return this.props.tasks.map((task, idx) => {
      return <Task key={task.id} task={task} index={idx}
        listId={this.props.listId}
        removeTask={this.props.removeTask}
        boardId={this.props.boardId} />
    });
  }
}

export default class List extends React.Component {
  onKeyDownHandle = (event) => {
    if(event.key === 'Escape'){
      this.props.closeTaskInput();
    }
  }

  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {(provided) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            onKeyDown={this.onKeyDownHandle}>
            <Header>
              <Title {...provided.dragHandleProps}>{this.props.column.title}</Title>
              <Menu><FontAwesomeIcon icon={faEllipsisH} size="lg" /></Menu>
            </Header>
            <Droppable droppableId={this.props.column.id} type="task">
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}>
                  <InnerList
                    tasks={this.props.tasks}
                    listId={this.props.column.id}
                    removeTask={this.props.removeTask}
                    boardId={this.props.boardId} />
                  {(this.props.listIdWithOpenTaskInput === this.props.column.id) ?
                    <AddTaskInput
                      addTask={this.props.addTask}
                      listId={this.props.column.id}
                      closeTaskInput={this.props.closeTaskInput} /> :
                    <AddTaskBtn
                      onClick={() => this.props.openTaskInput(this.props.column.id)}>
                        + {this.props.tasks.length ? 'Add another card' : 'Add a card'}
                    </AddTaskBtn>
                    }
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
