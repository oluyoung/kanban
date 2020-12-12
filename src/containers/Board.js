import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Header from '../components/Header';
import List from '../components/List';
import { getBoardLists } from '../store/selectors';
import { updateBoardListOrder, getBoard } from '../store/actions/board.creator';
import { updateSingleListOrder, updateListsOrder, openTaskInput } from '../store/actions/list.creator';
import { addTask, removeTask } from '../store/actions/task.creator';

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  jusify-content: flex-start;
  align-items: flex-start;
  overflow-x: scroll;
`;
const AddListBtn = styled.button`
   border: 0;
   outline: 0;
   background-color: #e7e9ed;
   font-weight: bold;
   padding: 8px;
   border-radius: 5px;
   width: 20vw
`;

class InnerList extends React.PureComponent {
  render() {
    const { list, taskMap, index } = this.props;
    const tasks = list.taskIds.map(taskId => taskMap[taskId]);
    return <List
      column={list} tasks={tasks} index={index}
      openTaskInput={this.props.openTaskInput}
      listIdWithOpenTaskInput={this.props.listIdWithOpenTaskInput}
      addTask={this.props.addTask}
      removeTask={this.props.removeTask}
    />;
  }
}

class Board extends Component {
  componentDidMount() {
    // this.props.getBoard();
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }

    if (type === 'list') {
      this.props.updateBoardListOrder(source, destination, draggableId);
      return;
    }

    if (source.droppableId === destination.droppableId) {
      this.props.updateSingleListOrder(source, destination, draggableId);
    } else {
      this.props.updateListsOrder(source, destination, draggableId);
    }
  }

  add = (event) => {
    if(event.key === 'Enter'){
       alert('Adding....');
    }
  }

  render() {
    return (
      <>
      <Header title={this.props.currentBoard.title} />
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId='all'
          direction='horizontal'
          type='list'>
          {provided => (
            <Container
              onKeyDown={this.add}
              {...provided.droppableProps}
              ref={provided.innerRef}>

              {this.props.currentBoard.listOrder.map((listId, index) => {
                const list = this.props.lists.find(list => (listId === list.id));
                return <InnerList
                  key={list.id}
                  list={list}
                  taskMap={this.props.tasks}
                  index={index}
                  openTaskInput={this.props.openTaskInput}
                  listIdWithOpenTaskInput={this.props.listIdWithOpenTaskInput}
                  addTask={this.props.addTask}
                  removeTask={this.props.removeTask} />
              })}

              {provided.placeholder}
              <AddListBtn>Add a new list</AddListBtn>
            </Container>
          )}
        </Droppable>
      </DragDropContext>
      </>
    );
  }
}

const mapStateToProps = state => ({
  currentBoard: state.boards.currentBoard,
  boards: state.boards.boards,
  lists: getBoardLists(state),
  tasks: state.tasks.tasks,
  listIdWithOpenTaskInput: state.lists.listIdWithOpenTaskInput
});

const mapDispatchToProps = dispatch => ({
  updateBoardListOrder: (source, destination, draggableId) => dispatch(updateBoardListOrder(source, destination, draggableId)),
  updateSingleListOrder: (source, destination, draggableId) => dispatch(updateSingleListOrder(source, destination, draggableId)),
  updateListsOrder: (source, destination, draggableId) => dispatch(updateListsOrder(source, destination, draggableId)),
  openTaskInput: (listId) => dispatch(openTaskInput(listId)),
  addTask: (content, listId) => dispatch(addTask(content, listId)),
  removeTask: (content, listId) => dispatch(removeTask(content, listId)),
  getBoard: () => dispatch(getBoard())
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
