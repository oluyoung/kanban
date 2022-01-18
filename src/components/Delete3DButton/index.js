import React from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

const Wrap = styled.div`
  position: absolute;
  bottom: -5px;
  right: -10px;
  z-index: 10;
`;

const DeleteButton = styled.button`
  background: var(--red);
  border: 2px solid var(--red-border);
  border-radius: 0.75em;
  transform-style: preserve-3d;
  color: var(--white);
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
  cursor: pointer;
  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: -4px;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--dark-red);
    border-radius: inherit;
    box-shadow: 0 0 0 2px var(--red-border);
    transform: translate3d(0, 0.75em, -1em);
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
  }
  &:hover {
    background: var(--pink);
    transform: translate(0, 0.25em);
    &::before {
      box-shadow: 0 0 0 2px var(--pink-border);
      transform: translate3d(0, 0.5em, -1em);
    }
  }
  &:active {
    background: var(--pink);
    transform: translate(0em, 0.75em);
    &::before {
      box-shadow: 0 0 0 2px var(--pink-border);
      transform: translate3d(0, 0, -1em);
    }
  }
`;

export default function Delete3DButton({ onClick }) {
  return (
    <Wrap>
      <DeleteButton onClick={onClick}>
        <FontAwesomeIcon icon={faMinus} size="1x" />
      </DeleteButton>
    </Wrap>
  )
}
