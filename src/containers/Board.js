import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Nav from '../components/Nav';
import Header from '../components/Header';
import List from '../components/List';
import AddList from '../components/AddList';
import { getBoardLists } from '../store/selectors';
import { updateBoardListOrder, getBoard } from '../store/actions/board.creator';
import {
  updateListTasksOrder,
  updateListsTasksOrder,
  addList,
  openTaskInput,
  closeTaskInput } from '../store/actions/list.creator';
import { addTask, removeTask } from '../store/actions/task.creator';

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  jusify-content: flex-start;
  align-items: flex-start;
`;

class InnerList extends React.PureComponent {
  render() {
    const { list, taskMap, index } = this.props;
    const tasks = list.taskIds.map(taskId => taskMap[taskId]);
    return <List
      column={list} tasks={tasks} index={index}
      openTaskInput={this.props.openTaskInput}
      closeTaskInput={this.props.closeTaskInput}
      listIdWithOpenTaskInput={this.props.listIdWithOpenTaskInput}
      addTask={this.props.addTask}
      removeTask={this.props.removeTask}
    />;
  }
}

class Board extends Component {
  componentDidMount() {
    this.props.getBoard(this.props.match.params.id, this.props.authorId);
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
      this.props.updateListTasksOrder(source, destination, draggableId);
    } else {
      this.props.updateListsTasksOrder(source, destination, draggableId);
    }
  }

  render() {
    let view = (
      <>
        <Nav />
        <h1>Page not found</h1>
      </>);

    if (this.props.currentBoard) {
      view = (
        <>
        <Nav />
        <Header title={this.props.currentBoard.title} />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable
            droppableId='all'
            direction='horizontal'
            type='list'>
            {provided => (
              <Container
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
                    closeTaskInput={this.props.closeTaskInput}
                    listIdWithOpenTaskInput={this.props.listIdWithOpenTaskInput}
                    addTask={this.props.addTask}
                    removeTask={this.props.removeTask} />
                })}
  
                {provided.placeholder}
                <AddList boardId={this.props.currentBoard.id} addNewList={this.props.addNewList} />
              </Container>
            )}
          </Droppable>
        </DragDropContext>
        </>
      );
    }

    return view;
  }
}

const mapStateToProps = state => ({
  authorId: state.authors.currentAuthorId,
  currentBoard: state.boards.currentBoard,
  boards: state.boards.boards,
  lists: getBoardLists(state),
  tasks: state.tasks.tasks,
  listIdWithOpenTaskInput: state.lists.listIdWithOpenTaskInput
});

const mapDispatchToProps = dispatch => ({
  updateBoardListOrder: (source, destination, draggableId) => dispatch(updateBoardListOrder(source, destination, draggableId)),
  updateListTasksOrder: (source, destination, draggableId) => dispatch(updateListTasksOrder(source, destination, draggableId)),
  updateListsTasksOrder: (source, destination, draggableId) => dispatch(updateListsTasksOrder(source, destination, draggableId)),
  openTaskInput: (listId) => dispatch(openTaskInput(listId)),
  closeTaskInput: () => dispatch(closeTaskInput()),
  addTask: (content, listId) => dispatch(addTask(content, listId)),
  addNewList: (boardId, title) => dispatch(addList(boardId, title)),
  removeTask: (content, listId) => dispatch(removeTask(content, listId)),
  getBoard: (boardId, authorId) => dispatch(getBoard(boardId, authorId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
