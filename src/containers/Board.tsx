import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { DragDropContext, Droppable, DraggableLocation, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { BoardModel, ListModel, RootState, TaskModel } from '../types';
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

interface InnerListProps {
  list: ListModel;
  taskMap: Record<string, TaskModel>;
  index: number;
  openTaskInput: (listId: string) => void;
  closeTaskInput: () => void;
  listIdWithOpenTaskInput: string;
  addTask: (content: string, listId: string, boardId: string) => void;
  removeList: (boardId: string, listId: string) => void;
  boardId: string;
}

interface IReactRouterParams {
  boardId: string;
  taskId: string;
}

interface Props extends RouteComponentProps<IReactRouterParams>, InnerListProps {
  currentBoard?: BoardModel;
  addNewList: (boardId: string, title: string) => void;
  getBoard: (boardId: string, authorId: string) => void;
  updateBoardListOrder: (source: DraggableLocation, destination: DraggableLocation, draggableId: string) => void;
  updateListTasksOrder: (source: DraggableLocation, destination: DraggableLocation, draggableId: string) => void;
  updateListsTasksOrder: (source: DraggableLocation, destination: DraggableLocation, draggableId: string) => void;
  authorId?: string;
  logout: () => void;
  lists: Record<string, ListModel>
  tasks: Record<string, TaskModel>
}

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

class InnerList extends React.PureComponent<InnerListProps> {
  render() {
    const { list, taskMap, index } = this.props;
    const tasks = list.taskIds.map((taskId: string) => {
      const task = taskMap[taskId];
      if (task) {
        return task;
      }
      return null;
    }).filter(Boolean) as TaskModel[];

    return (
      <List
        column={list}
        tasks={tasks}
        index={index}
        openTaskInput={this.props.openTaskInput}
        closeTaskInput={this.props.closeTaskInput}
        listIdWithOpenTaskInput={this.props.listIdWithOpenTaskInput}
        addTask={this.props.addTask}
        removeList={this.props.removeList}
        boardId={this.props.boardId}
      />
    );
  }
}

class Board extends Component<Props> {
  state = {
    modalIsOpen: false
  };

  componentDidMount() {
    this.props.getBoard(this.props.match.params.boardId, this.props.authorId as string);
  }

  componentDidUpdate() {
    if (this.props.match.params.taskId && !this.state.modalIsOpen) {
      this.setState({modalIsOpen: true});
    }
  }

  onDragEnd = (result: DropResult) => {
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
                  {this.props.currentBoard && this.props.currentBoard.listOrder.map((listId, index) => {
                    const list = this.props.lists[listId];
                    if (this.props.currentBoard && list) {
                      return (
                        <InnerList
                          key={list.id}
                          list={list}
                          taskMap={this.props.tasks}
                          index={index}
                          boardId={this.props.currentBoard.id}
                          openTaskInput={this.props.openTaskInput}
                          closeTaskInput={this.props.closeTaskInput}
                          listIdWithOpenTaskInput={this.props.listIdWithOpenTaskInput}
                          addTask={this.props.addTask}
                          removeList={this.props.removeList}
                        />
                      );
                    }
                    return null;
                  }).filter(Boolean)}
    
                  {provided.placeholder}
                  {this.props.currentBoard && <AddList boardId={this.props.currentBoard.id} addNewList={this.props.addNewList} />}
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

const mapStateToProps = (state: RootState) => ({
  authorId: state.authors.currentAuthorId,
  currentBoard: state.boards.currentBoard,
  boards: state.boards.boards,
  lists: state.lists.lists,
  tasks: state.tasks.tasks,
  listIdWithOpenTaskInput: state.lists.listIdWithOpenTaskInput
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  updateBoardListOrder: (source: DraggableLocation, destination: DraggableLocation, draggableId: string) => dispatch(updateBoardListOrder(source, destination, draggableId)),
  updateListTasksOrder: (source: DraggableLocation, destination: DraggableLocation, draggableId: string) => dispatch(updateListTasksOrder(source, destination, draggableId)),
  updateListsTasksOrder: (source: DraggableLocation, destination: DraggableLocation, draggableId: string) => dispatch(updateListsTasksOrder(source, destination, draggableId)),
  openTaskInput: (listId: string) => dispatch(openTaskInput(listId)),
  closeTaskInput: () => dispatch(closeTaskInput()),
  addTask: (content: string, listId: string, boardId: string) => dispatch(addTask(content, listId, boardId)),
  addNewList: (boardId: string, title: string) => dispatch(addList(boardId, title)),
  removeList: (boardId: string, listId: string) => dispatch(removeList(boardId, listId)),
  removeTask: (task: TaskModel) => dispatch(removeTask(task)),
  getBoard: (boardId: string, authorId: string) => dispatch(getBoard(boardId, authorId)),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
