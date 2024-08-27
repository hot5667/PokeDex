import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import LoadingBar from '../pages/LodingPage';
import ErrorPage from '../pages/ErrorPage';
import { selectPokemonDetails, selectPokemonDetailsLoading, selectPokemonDetailsError } from '../features/pokemonDetailsSlice';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
`;

const PokemonDetailsCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
  max-width: 600px;
  text-align: center;
  position: relative; /* Added for button positioning */
`;

const PokemonImage = styled.img`
  width: 250px;
  height: 250px;
`;

const PokemonName = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const PokemonTypes = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const PokemonType = styled.div`
  background-color: ${props => props.color};
  color: white;
  padding: 8px;
  border-radius: 8px;
  font-weight: bold;
`;

const PokemonDescription = styled.p`
  margin-top: 16px;
  font-size: 16px;
`;

const BackButton = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const PokedexDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemonDetails = useSelector(selectPokemonDetails) || {}; // 초기 상태를 빈 객체로 설정
  const isLoading = useSelector(selectPokemonDetailsLoading);
  const error = useSelector(selectPokemonDetailsError);

  useEffect(() => {
    dispatch({ type: 'pokemon/fetchPokemonDetails', payload: { id } });
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <Container>
        <LoadingBar />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorPage errorCode={500} message={error} />
      </Container>
    );
  }

  if (!pokemonDetails.name) {
    return null; // 데이터를 아직 받지 못했을 때 아무것도 렌더링하지 않음
  }

  return (
    <Container>
      <PokemonDetailsCard className='nes-container is-rounded'>
        <BackButton onClick={() => window.history.back()}>뒤로 가기</BackButton>
        <PokemonImage src={pokemonDetails.sprites?.front_default} alt={pokemonDetails.name} />
        <PokemonName>{pokemonDetails.name}</PokemonName>
        <PokemonTypes>
          {pokemonDetails.types?.map((type, index) => (
            <PokemonType key={index} color={type.color}>
              {type.name}
            </PokemonType>
          ))}
        </PokemonTypes>
        <PokemonDescription className='nes-container with-title is-centered'>{pokemonDetails.description}</PokemonDescription>
      </PokemonDetailsCard>
    </Container>
  );
};

export default PokedexDetailsPage;