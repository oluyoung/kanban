import React from 'react';
import styled from 'styled-components';
import SaveCloseButtons from '../SaveCloseButtons';

interface Props {
  content: string;
  updateContent: (value: string) => void;
  closeInput: () => void;
}

const ContentBox = styled.input`
  border: 0;
  border-bottom: 1px solid;
  background: transparent;
  padding: 1px;
  font-weight: bold;
  font-size: 1.72em;
  width: 80%;
  outline: none;
`;

export default function ContentInput(props: Props) {
  const [content, setContent] = React.useState(props.content);

  return (
    <>
      <ContentBox
        value={content}
        onChange={event => setContent(event.target.value)} />
      <SaveCloseButtons
        save={props.updateContent}
        value={content}
        close={props.closeInput} />
    </>
  );
}
