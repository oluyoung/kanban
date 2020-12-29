import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
	margin: 8px;
	margin-top: 0;
	border: 1px solid lightgrey;
	border-radius: 5px;
	width: calc(20% - 8px);
	background-color: #e7e9ed;
	display: flex;
	flex-flow: column nowrap;
	flex-shrink: 0;
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
const InputContainer = styled.div`
  padding: 5px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;
const Input = styled.input`
  padding: 3px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 80%;
`;
const InputButton = styled.button`
  display: inline-block;
  outline: none;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

export default function AddList(props) {
	const [isOpen, setIsOpen] = React.useState(false);
	const [value, setValue] = React.useState('');
  const inputRef = React.useRef();

  React.useEffect(() => {
		if (isOpen) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	const openInput = () => setIsOpen(true);
	const onKeyDownHandle = (event) => {
    if(event.key === 'Escape'){
      setIsOpen(false);
    }
  };
  return (
    <Container onKeyDown={onKeyDownHandle}>
			{isOpen ?
				(<InputContainer>
					<Input required value={value} ref={inputRef} onChange={(event) => setValue(event.target.value)} />
					<InputButton onClick={() => {
						if (Boolean(value.trim())) {
							props.addNewList(props.boardId, value);
							setValue('');
							setIsOpen(false);
						} else {
							inputRef.current.focus();
						}
					}}>
						<FontAwesomeIcon icon={faPlusCircle} size="lg" />
					</InputButton>
				</InputContainer>) :
				<Button onClick={openInput}>Add New List</Button>}
    </Container>
  );
}
