import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #657d8a;
  width: 100vw;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
`;
const Inner = styled.div`
  max-width: 99%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 99%;
`;
const Boards = styled.a`
  padding: 2px 10px;
  background-color: #89a0a9;
  border-radius: 5px;
  color: white;
  display: block;
`;

function Nav() {
  return (
    <Container>
      <Inner>
        <Boards>Boards</Boards>
      </Inner>
    </Container>
  )
}

export default Nav;
