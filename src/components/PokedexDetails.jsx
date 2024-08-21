import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import TypeBadge from './TypeBadge'; 

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
`;

const PokemonImage = styled.img`
  width: 480px;
  height: 480px;
  image-rendering: pixelated;
`;

const TypesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;

const PokedexDetails = ({ number, name, image, types = [] }) => {
  const navigate = useNavigate();

  const typeNames = Array.isArray(types) && types.length > 0
    ? types.map((type, index) => {
        const typeName = typeof type === 'string' ? type : type.name;
        return <TypeBadge key={index} type={typeName} />;
      })
    : ' ';

  const handleImageClick = () => {
    navigate(`/pokemon/${number}`);
  };

  return (
    <DetailsContainer onClick={handleImageClick}>
      <PokemonImage className="nes-container is-rounded" src={image} alt={name} />
      <TypesContainer>
        {typeNames}
      </TypesContainer>
    </DetailsContainer>
  );
};

export default PokedexDetails;
