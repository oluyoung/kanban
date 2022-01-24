import React from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import chroma, { Color } from "chroma-js";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface ButtonStyleProps {
  bgColor: string;
  borderColor: string;
  iconColor: string;
  shadow: string;
  activeColor: string;
}

interface Props {
  onClick: (event: React.MouseEvent) => void;
  bgColor: string;
  iconColor: string;
  shadow: string;
  icon: IconProp;
}

const Button = styled.button<ButtonStyleProps>`
  background: ${({ bgColor }) => bgColor};
  border: 2px solid ${({ borderColor }) => borderColor};
  border-radius: 8px;
  transform-style: preserve-3d;
  color: ${({ iconColor }) => iconColor};
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
    background: ${({ shadow }) => shadow};
    border-radius: inherit;
    box-shadow: 0 0 0 2px ${({ borderColor }) => borderColor};
    transform: translate3d(0, 0.75em, -1em);
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
  }
  &:hover {
    background: ${({ activeColor }) => activeColor};
    transform: translate(0, 0.25em);
    &::before {
      box-shadow: 0 0 0 2px ${({ borderColor }) => borderColor};
      transform: translate3d(0, 0.5em, -1em);
    }
  }
  &:active {
    background: ${({ activeColor }) => activeColor};
    transform: translate(0em, 0.75em);
    &::before {
      box-shadow: 0 0 0 2px ${({ borderColor }) => borderColor};
      transform: translate3d(0, 0, -1em);
    }
  }
`;

export default function ThreeDButton({ onClick, bgColor, iconColor, shadow, icon }: Props) {
  const color: Color = chroma(bgColor);

  return (
    <Button
      onClick={onClick}
      bgColor={bgColor}
      iconColor={iconColor}
      borderColor={color.darken(2).hex()}
      activeColor={color.brighten(2).hex()}
      shadow={shadow || color.darken(3).hex()}>
      <FontAwesomeIcon icon={icon} size="1x" />
    </Button>
  );
}
