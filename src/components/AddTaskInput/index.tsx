import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  addTask: (value: string, listId: string, boardId: string) => void;
  closeTaskInput: () => void;
  listId: string;
  boardId: string;
}

const Container = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;
const TextArea = styled.textarea`
  border-radius: 5px;
  border: 2px solid #a6cddf;
  padding: 8px;
  max-height: 30px;
  min-height: 30px;
  width: 100%;
  max-width: 95%;
  font-family: inherit;
  margin-bottom: 10px;
  resize: none;
`;
const Add = styled.button`
  outline: none;
  border: 0;
  border-radius: 5px;
  background-color: #55e360;
  color: #111;
  font-weight: bold;
  cursor: pointer;
  display: block;
  padding: 5px 12px;
  margin-right: 10px;
`;
const Close = styled.a`
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: black;
`;

function AddTaskInput(props: Props) {
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = React.useState<string>('');

  React.useEffect(() => {
    if (inputRef.current)
      inputRef.current.focus();
  });

  const keyDownHandle = (event: React.KeyboardEvent) => (event.key === 'Enter' ? addTask : () => {})();

  const addTask = () => {
    if (inputRef.current) {
      if (inputRef.current.value) {
        props.addTask(inputRef.current.value, props.listId, props.boardId);
      } else {
        inputRef.current.focus();
      }
    }
  }

  return (
    <Container onKeyDown={keyDownHandle}>
      <TextArea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        ref={inputRef}
        placeholder="Wash hands and face" />
      <Add onClick={() => addTask()}>Add</Add>
      <Close onClick={() => props.closeTaskInput()}>
        <FontAwesomeIcon icon={faTimes} />
      </Close>
    </Container>
  );
}

export default AddTaskInput;
