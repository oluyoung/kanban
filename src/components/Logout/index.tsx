import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

interface Props {
  logout: () => void;
}

const Button = styled.a`
  color: var(--dark-red);
  cursor: pointer;

  &:hover,
  &:active {
    color: var(--dark-pink);
  }
`;

export default function Logout(props: Props) {
  return (
    <Button onClick={() => props.logout()}>
      <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
    </Button>
  );
}
