import React from 'react';
import styled from '@emotion/styled';

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const PokedexHeader = () => {
  return <Header className='nes-container is-rounded with-title is-centered'>전국도감</Header>;
};

export default PokedexHeader;