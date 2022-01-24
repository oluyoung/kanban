import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

interface Props {
	boardId: string;
	addNewList: (id: string, value: string) => void
}

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

	@media (max-width: 1024px) {
    width: calc(33.33333% - 8px);
  }

  @media (max-width: 768px) {
    width: calc(50% - 8px);
  }

  @media (max-width: 480px) {
    width: calc(80% - 8px);
  }
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

export default function AddList(props: Props) {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const [value, setValue] = React.useState<string>('');
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	const openInput = () => setIsOpen(true);
	const onKeyDownHandle = (event: React.KeyboardEvent) => {
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
							return;
						}
						if (inputRef.current)
							inputRef.current.focus();
					}}>
						<FontAwesomeIcon icon={faPlusCircle} size="lg" />
					</InputButton>
				</InputContainer>) :
				<Button onClick={openInput}>Add New List</Button>}
    </Container>
  );
}
