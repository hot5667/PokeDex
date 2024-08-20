import React from 'react';
import styled from '@emotion/styled';

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PokemonImage = styled.img`
  width: 360px;
  height: 360px;
  image-rendering: pixelated;
`;

const PokedexDetails = ({name, image }) => {
  return (
    <DetailsContainer>
      <PokemonImage className = 'nes-container is-rounded'src={image} alt={name} />
    </DetailsContainer>
  );
};

export default PokedexDetails;