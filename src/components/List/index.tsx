import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TaskModel } from '../../types';
import Task from '../Task';
import AddTaskInput from '../AddTaskInput';

interface InnerListProps {
  tasks: TaskModel[];
  listId: string;
  boardId: string;
}

interface Props extends Omit<InnerListProps, 'listId'> {
  addTask: (content: string, listId: string, boardId: string) => void;
  closeTaskInput: () => void;
  openTaskInput: (columnId: string) => void;
  removeList: (boardId: string, columnId: string) => void;
  listIdWithOpenTaskInput: string;
  index: number;
  column: {
    id: string;
    title: string;
  }
}

const Container = styled.div`
  margin: 8px;
  margin-top: 0;
  border: 1px solid lightgrey;
  border-radius: 5px;
  width: calc(20% - 8px);
  background-color: #e6e9ed;
  display: flex;
  flex-flow: column nowrap;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    width: calc(33.33333% - 8px);
  }

  @media (max-width: 768px) {
    width: calc(50% - 8px);
  }

  @media (max-width: 480px) {
    width: calc(66.66666% - 8px);
  }
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
const AddTaskBtn = styled.button`
  outline: none;
  border: 0;
  background-color: transparent;
  font-weight: bold;
  color: #66686d;
  cursor: pointer;
`;
const TaskList = styled.div<{ isDraggingOver : boolean }>`
  padding: 8px;
  transition: all 0.2s ease;
  background-color: #e6e9ed;
  flex-grow: 1;
  min-height: 100px;
`;
const DeleteBtn = styled.a`
  color: red;
  display: inline-block;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
`;

// optimize task list to not re-render on every update but only if there is a difference in tasks list handling
// can probably use PureComponent, and should extract into different components
class InnerList extends React.Component<InnerListProps> {
  shouldComponentUpdate(nextProps: InnerListProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false;
    }
    return true;
  }

  render() {
    return this.props.tasks.map((task, idx) => {
      if (task) {
        return (
          <Task
            key={task.id}
            task={task}
            index={idx}
            listId={this.props.listId}
            boardId={this.props.boardId}
          />
        );
      }
      return null;
    });
  }
}

const List = (props: Props) => {
  const onKeyDownHandle = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape'){
      props.closeTaskInput();
    }
  }

  const removeList = () => {
    const result = window.confirm('Are you sure you want to remove the list?');
    if (result) {
      props.removeList(props.boardId, props.column.id);
    }
  }

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          onKeyDown={onKeyDownHandle}>
          <Header {...provided.dragHandleProps}>
            <Title>{props.column.title}</Title>
            <DeleteBtn onClick={removeList}><FontAwesomeIcon icon={faTrash} /></DeleteBtn>
          </Header>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}>
                <InnerList
                  tasks={props.tasks}
                  listId={props.column.id}
                  boardId={props.boardId}
                />
                {(props.listIdWithOpenTaskInput === props.column.id) ?
                  <AddTaskInput
                    addTask={props.addTask}
                    listId={props.column.id}
                    boardId={props.boardId}
                    closeTaskInput={props.closeTaskInput} /> :
                  <AddTaskBtn
                    onClick={() => props.openTaskInput(props.column.id)}>
                      + {props.tasks.length ? 'Add another card' : 'Add a card'}
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

export default List;
