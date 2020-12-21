import React from 'react';
import styled from 'styled-components';
import AddNewListInput from '../AddNewListInput';

const Container = styled.div`
	margin: 8px;
	margin-top: 0;
	border: 1px solid lightgrey;
	border-radius: 5px;
	width: calc(20vw - 8px);
	background-color: #e7e9ed;
	display: flex;
	flex-flow: column nowrap;
`;
const Button = styled.button`
	border: 0;
	outline: 0;
	background-color: #e7e9ed;
	font-weight: bold;
	padding: 8px;
	border-radius: 5px;
	cursor: pointer;
`;

export default function AddList(props) {
	const [isOpen, setIsOpen] = React.useState(false);
	const openInput = () => setIsOpen(true);
	const onKeyDownHandle = (event) => {
    if(event.key === 'Escape'){
      setIsOpen(false);
    }
  }
  return (
    <Container onKeyDown={onKeyDownHandle}>
			{isOpen ?
				<AddNewListInput boardId={props.boardId} addNewList={props.addNewList} /> :
				<Button onClick={openInput}>Add New List</Button>}
    </Container>
  );
}
