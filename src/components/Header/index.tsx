import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
}

const Container = styled.div`
  width: 100vw;
  padding: 16px 0;
`;
const Title = styled.h3`
  padding-left: 8px;
`;

function Header(props: Props) {
  return (
    <Container>
      <Title>{props.title}</Title>
    </Container>
  );
}

export default Header;
