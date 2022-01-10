import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Nav from '../components/Nav';
import Header from '../components/Header';
import List from '../components/List';
import AddList from '../components/AddList';
import TaskModal from '../components/TaskModal';
import { logout } from '../store/actions/author.creator';
import { updateBoardListOrder, getBoard } from '../store/actions/board.creator';
import {
  updateListTasksOrder,
  updateListsTasksOrder,
  addList,
  removeList,
  openTaskInput,
  closeTaskInput } from '../store/actions/list.creator';
import { addTask, removeTask } from '../store/actions/task.creator';
import localService from '../store/local.service';

const Container = styled.div`
  max-width: 100%;
  padding-right: 8px;
`;
const InnerContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-x: auto;
  padding-bottom: 100px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

class InnerList extends React.PureComponent {
  render() {
    const { list, taskMap, index } = this.props;
    const tasks = list.taskIds.map(taskId => {
      const task = taskMap[taskId];
      if (task) {
        return task;
      }
      return null;
    });

    return <List
      column={list} tasks={tasks} index={index}
      openTaskInput={this.props.openTaskInput}
      closeTaskInput={this.props.closeTaskInput}
      listIdWithOpenTaskInput={this.props.listIdWithOpenTaskInput}
      addTask={this.props.addTask}
      removeTask={this.props.removeTask}
      removeList={this.props.removeList}
      boardId={this.props.boardId}
    />;
  }
}

class Board extends Component {
  state = {
    modalIsOpen: false
  };

  componentDidMount() {
    const boardId = localService.getBoard();
    const author = localService.getAuthor();
    if (!boardId || !author) {
      this.props.history.push(`/`);
    }
    this.props.getBoard(boardId, author.id);
  }

  componentDidUpdate() {
    if (this.props.match.params.taskId && !this.state.modalIsOpen) {
      this.setState({modalIsOpen: true});
    }
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

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  logout = () => {
    this.props.logout();
    this.props.history.push(`/`);
  }

  render() {
    let view = <h1>Page not found</h1>;

    if (this.props.currentBoard) {
      view = (
        <>
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
                <InnerContainer>
                  {this.props.currentBoard.listOrder.map((listId, index) => {
                    const list = this.props.lists[listId];
                    if (list) {
                      return <InnerList
                        key={list.id}
                        list={list}
                        taskMap={this.props.tasks}
                        index={index}
                        boardId={this.props.currentBoard.id}
                        openTaskInput={this.props.openTaskInput}
                        closeTaskInput={this.props.closeTaskInput}
                        listIdWithOpenTaskInput={this.props.listIdWithOpenTaskInput}
                        addTask={this.props.addTask}
                        removeTask={this.props.removeTask}
                        removeList={this.props.removeList} />
                    }
                    return null;
                  })}
    
                  {provided.placeholder}
                  <AddList boardId={this.props.currentBoard.id} addNewList={this.props.addNewList} />
                </InnerContainer>
              </Container>
            )}
          </Droppable>
        </DragDropContext>
        {this.state.modalIsOpen &&
          <TaskModal closeModal={this.closeModal} />
        }
        </>
      );
    }

    return (<><Nav logout={this.logout} />{view}</>);
  }
}

const mapStateToProps = state => ({
  authorId: state.authors.currentAuthorId,
  currentBoard: state.boards.currentBoard,
  boards: state.boards.boards,
  lists: state.lists.lists,
  tasks: state.tasks.tasks,
  listIdWithOpenTaskInput: state.lists.listIdWithOpenTaskInput
});

const mapDispatchToProps = dispatch => ({
  updateBoardListOrder: (source, destination, draggableId) => dispatch(updateBoardListOrder(source, destination, draggableId)),
  updateListTasksOrder: (source, destination, draggableId) => dispatch(updateListTasksOrder(source, destination, draggableId)),
  updateListsTasksOrder: (source, destination, draggableId) => dispatch(updateListsTasksOrder(source, destination, draggableId)),
  openTaskInput: (listId) => dispatch(openTaskInput(listId)),
  closeTaskInput: () => dispatch(closeTaskInput()),
  addTask: (content, listId, boardId) => dispatch(addTask(content, listId, boardId)),
  addNewList: (boardId, title) => dispatch(addList(boardId, title)),
  removeList: (boardId, listId) => dispatch(removeList(boardId, listId)),
  removeTask: (content, listId) => dispatch(removeTask(content, listId)),
  getBoard: (boardId, authorId) => dispatch(getBoard(boardId, authorId)),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
