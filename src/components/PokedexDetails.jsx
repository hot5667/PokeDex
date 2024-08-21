import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
`;

const PokemonImage = styled.img`
  width: 480px;
  height: 480px;
  image-rendering: pixelated;
`;

const PokedexDetails = ({ number, name, image }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/pokemon/${number}`);
  };

  return (
    <DetailsContainer onClick={handleImageClick}>
      <PokemonImage className = 'nes-container is-rounded' src={image} alt={name} />
    </DetailsContainer>
  );
};

export default PokedexDetails;