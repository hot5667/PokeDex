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
  width: 300px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
  z-index: 1001;
`;

const FilterButton = styled.button`
  background-color: ${(props) => typeNamekr[props.type]?.color || '#ccc'};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
  font-weight: bold;
  text-transform: capitalize;
`;

const FilterTitle = styled.h3`
  margin-bottom: 16px;
`;

const ActionButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
  font-weight: bold;
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
        {Object.keys(typeNamekr).map((type) => (
          <FilterButton
            key={type}
            type={type}
            onClick={() => handleFilter(type)}
          >
            {typeNamekr[type].name}
          </FilterButton>
        ))}
        <ActionButton onClick={handleApplyFilter}>적용</ActionButton>
        <ActionButton onClick={onClose}>닫기</ActionButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default PokedexFilter;