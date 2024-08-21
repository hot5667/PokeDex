import React from 'react';
import styled from '@emotion/styled';
import { typeColors, koTypeNames } from '../constants/typeName'; 

const Badge = styled.div`
  background-color: ${(props) => typeColors[props.type] || '#ccc'};
  color: #fff;
  border-radius: 12px;
  padding: 8px 16px;
  margin: 4px;
  display: inline-block;
  font-weight: bold;
  text-transform: capitalize;
`;

const TypeBadge = ({ type }) => {
  const typeName = koTypeNames[type] || type;
  return <Badge type={type}>{typeName}</Badge>;
};

export default TypeBadge;