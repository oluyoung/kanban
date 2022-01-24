import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  value: string;
  save: (value: string) => void;
  close: () => void;
}

const Buttons = styled.div`
  margin-top: 10px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;
const Save = styled.button`
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
const Cancel = styled.a`
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: black;
`;

export default function SaveCloseButtons(props: Props) {
  return (
    <Buttons>
      <Save onClick={() => props.save(props.value)}>Save</Save>
      <Cancel onClick={() =>  props.close()}>
        <FontAwesomeIcon icon={faTimes} />
      </Cancel>
    </Buttons>
  )
};
