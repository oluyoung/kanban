import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
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
const Button = styled.button`
  display: inline-block;
  outline: none;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

export default function AddNewListInput(props) {
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Container>
      <Input required value={value} ref={inputRef} onChange={(event) => setValue(event.target.value)} />
      <Button onClick={() => {
        if (Boolean(value.trim())) {
          props.addNewList(props.boardId, value);
        } else {
          inputRef.current.focus();
        }
      }}>
        <FontAwesomeIcon icon={faPlusCircle} size="lg" />
      </Button>
    </Container>
  );
}
