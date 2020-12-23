import React from 'react';
import styled from 'styled-components';
import SaveCloseButtons from '../SaveCloseButtons';

const DescriptionBox = styled.textarea`
  resize: none;
  width: 96%;
  height: 100px;
  border-radius: 5px;
  padding: 10px;
  font-family: sans-serif;
  font-size: 16px;
`;

export default function DescriptionInput(props) {
  const [description, setDescription] = React.useState(props.description);

  return (
    <>
      <DescriptionBox
        placeholder="Add a more detailed description..."
        value={description}
        onChange={event => setDescription(event.target.value)}>
      </DescriptionBox>
      <SaveCloseButtons
        save={props.updateDescription}
        value={description}
        close={props.closeInput} />
    </>
  );
};
