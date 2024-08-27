import React from 'react';
import styled from '@emotion/styled';

// 스타일 컴포넌트 정의
const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  box-shadow: ${({ isActive }) => 
    isActive 
      ? 'inset 2px 2px 0 #000, inset -2px -2px 0 #000' 
      : '2px 2px 0 #000, -2px -2px 0 #000'};
  background-image: linear-gradient(to bottom, #ffffff, #e0e0e0);
  border-radius: 3px; 

  &:hover {
  }
`;

const PokedexButton = ({ onClick, children }) => {
  return (
    <Button className = 'nes-btn' onClick={onClick}>
      {children}
    </Button>
  );
};

export default PokedexButton;
