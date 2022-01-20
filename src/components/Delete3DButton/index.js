import React from 'react'
import styled from 'styled-components';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import ThreeDButton from '../ThreeDButton';
import { red, white, darkRed } from '../../colors';

const Wrap = styled.div`
  position: absolute;
  bottom: -5px;
  right: -10px;
  z-index: 10;
`;

export default function Delete3DButton({ onClick }) {
  return (
    <Wrap>
      <ThreeDButton
        onClick={onClick}
        icon={faMinus}
        bgColor={red}
        iconColor={white}
        shadow={darkRed}
      />
    </Wrap>
  );
}
