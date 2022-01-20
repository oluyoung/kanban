import React from 'react';
import ReactMarkdown from "react-markdown";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import SaveCloseButtons from '../SaveCloseButtons';

export default function DescriptionInput(props) {
  const mdRef = React.useRef(null);
  const [description, setDescription] = React.useState(props.description || '');

  return (
    <>
      <Editor
        value={description}
        onChange={({ html, text }) => setDescription(text)}
        ref={mdRef}
        canView={{ html: false }}
        style={{ height: '300px' }}
        renderHTML={text => <ReactMarkdown children={text} />}
      />
      <SaveCloseButtons
        save={() => props.updateDescription(description)}
        value={description}
        close={props.closeInput} />
    </>
  );
};
