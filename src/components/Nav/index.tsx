import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logout from '../Logout';

interface Props {
  logout: () => void;
}

const Container = styled.div`
  background-color: #657d8a;
  width: 100vw;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
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

export default function Nav(props: Props) {
  return (
    <Container>
      <Inner>
        <Link to="/boards" component={(props) => <Boards {...props}>Boards</Boards> } />
        <Logout logout={props.logout} />
      </Inner>
    </Container>
  );
}
