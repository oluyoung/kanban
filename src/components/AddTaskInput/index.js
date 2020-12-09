import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding; 0;
  margin: 0;
  display: block;
`;
const TextArea = styled.textarea`
  border-radius: 5px;
  border: 2px solid #a6cddf;
  padding: 8px;
  max-height: 40px;
  width: 100%;
  max-width: 90%;
  font-family: inherit;
`;
const Button = styled.button`
  outline: none;
  border: 0;
  border-radius: 5px;
  background-color: #a6cddf;
  color: #111;
  font-weight: bold;
  cursor: pointer;
  display: block;
  padding: 5px 12px;
`

function AddTaskInput(props) {
  const inputRef = React.useRef(null);
  const [value, setValue] = React.useState(undefined);

  return (
    <Container>
      <TextArea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        ref={inputRef}
        placeholder="Wash hands and face" />
      <Button
        onClick={() => props.addTask(inputRef.current.value, props.listId)}>Add</Button>
    </Container>
  );
}

export default AddTaskInput;
