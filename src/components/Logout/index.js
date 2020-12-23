import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Button = styled.a`
  color: white;
  cursor: pointer;
`;

export default function Logout(props) {
  return (
    <Button onClick={() => props.logout()}>
      <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
    </Button>
  );
}
