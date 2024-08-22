import React from 'react';
import styled from '@emotion/styled';
import { typeNamekr } from '../constants/typeName'; 

const Badge = styled.div`
  background-color: ${(props) => props.color || '#ccc'};
  color: #fff;
  border-radius: 12px;
  padding: 8px 16px;
  margin: 4px;
  display: inline-block;
  font-weight: bold;
  text-transform: capitalize;
`;

const TypeBadge = ({ type }) => {
  const typeInfo = typeof type === 'string' ? typeNamekr[type] : type;
  const typeName = typeInfo?.name || type;
  const typeColor = typeInfo?.color || '#ccc';

  if (!typeName) {
    console.error('Invalid type:', type);
    return null;
  }

  return <Badge color={typeColor}>{typeName}</Badge>;
};

export default TypeBadge;
