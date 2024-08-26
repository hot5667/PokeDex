import React, { useState } from 'react';
import styled from '@emotion/styled';
import { typeNamekr } from '../constants/typeName'; 
import 'nes.css/css/nes.min.css';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 16px;
  width: 400px; /* Modal의 너비를 조절할 수 있습니다. */
  border-radius: 8px; /* Rounded corners for the modal */
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
  z-index: 1001;
  text-align: center; /* Center the text and buttons */
`;

const FilterTitle = styled.h3`
  margin-bottom: 16px;
  font-size: 1.5em; /* Slightly larger title */
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 16px;
`;

const FilterButton = styled.button`
  background-color: ${(props) => typeNamekr[props.type]?.color || '#ccc'};
  color: #fff;
  border: none;
  border-radius: 6px; /* Slightly more rounded corners */
  padding: 10px 20px; /* Adjust padding for button size */
  margin: 6px; /* Space between buttons */
  cursor: pointer;
  font-weight: bold;
  text-transform: capitalize;
  max-width: 120px; /* Max width for the buttons */
  text-align: center; /* Center text */
  font-size: 1em; /* Font size for the button text */
  transition: all 0.3s ease; /* Smooth transition for all properties */
  
  &:hover {
    background-color: ${(props) => props.type ? typeNamekr[props.type]?.hoverColor || '#aaa' : '#aaa'};
    transform: scale(1.05); /* Slightly enlarge the button on hover */
  }
  
  &:active {
    background-color: ${(props) => props.type ? typeNamekr[props.type]?.activeColor || '#888' : '#888'};
    transform: scale(0.98); /* Slightly shrink the button on click */
  }
`;

const ActionButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px; /* Slightly more rounded corners */
  padding: 10px 20px; /* Adjust padding for button size */
  margin: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1em; /* Font size for the button text */
  transition: all 0.3s ease; /* Smooth transition for all properties */
  
  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
    transform: scale(1.05); /* Slightly enlarge the button on hover */
  }
  
  &:active {
    background-color: #004080; /* Even darker shade on click */
    transform: scale(0.98); /* Slightly shrink the button on click */
  }
`;

const PokedexFilter = ({ isOpen, onClose, onFilter }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleFilter = (type) => {
    setSelectedType(type);
  };

  const handleApplyFilter = () => {
    onFilter(selectedType);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContainer className='nes-container is-rounded'>
        <FilterTitle>타입을 지정해주세요.</FilterTitle>
        <ButtonGroup>
          {Object.keys(typeNamekr).map((type) => (
            <FilterButton
              key={type}
              type={type}
              onClick={() => handleFilter(type)}
            >
              {typeNamekr[type].name}
            </FilterButton>
          ))}
        </ButtonGroup>
        <div>
          <ActionButton onClick={handleApplyFilter}>적용</ActionButton>
          <ActionButton onClick={onClose}>닫기</ActionButton>
        </div>
      </ModalContainer>
    </ModalBackground>
  );
};

export default PokedexFilter;