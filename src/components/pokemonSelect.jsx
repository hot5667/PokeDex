import React, { useState } from 'react';
import styled from '@emotion/styled';

const AccordionContainer = styled.div`
  width: 100%;
  border: 1px solid #ccc;
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid #ccc;
  &:last-child {
    border-bottom: none;
  }
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  cursor: pointer;
`;

const AccordionContent = styled.div`
  padding: 10px;
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease, max-height 0.3s ease;
  background-color: #fff;
`;

const PokemonSelect = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = ['이름', '타입', '능력', '특성', '지역', '세대'];

  return (
    <AccordionContainer>
      {items.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionHeader onClick={() => toggleAccordion(index)}>
            {item}
            <span>{openIndex === index ? '▼' : '▶'}</span>
          </AccordionHeader>
          <AccordionContent isOpen={openIndex === index}>
            {/* 여기에 각 항목에 대한 내용을 추가하세요 */}
            {item}에 대한 세부 내용
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionContainer>
  );
};

export default PokemonSelect;
