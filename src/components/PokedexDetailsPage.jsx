import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { fetchPokemonDetails } from '../features/pokemonSlice';
import ErrorPage from './ErrorPage';
import TypeBadge from './TypeBadge;';


const FullScreenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;

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

const TypeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PokedexDetailsPage = () => {
  const { id } = useParams(); // URL 파라미터에서 id를 가져옵니다.
  const dispatch = useDispatch();
  const { data: pokemonDetails, isLoading, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (id) {
      dispatch(fetchPokemonDetails(id)); // id를 사용하여 포켓몬 세부 정보를 요청합니다.
    }
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <FullScreenContainer>
        <div>Loading...</div>
      </FullScreenContainer>
    );
  }

  if (error) {
    return (
      <FullScreenContainer>
        <ErrorPage errorCode={500} message={error} />
      </FullScreenContainer>
    );
  }

  if (!pokemonDetails) {
    return (
      <FullScreenContainer>
        <ErrorPage errorCode={404} message="포켓몬을 찾을 수 없습니다." />
      </FullScreenContainer>
    );
  }

  const { sprites, name, types, description } = pokemonDetails;
  const typeNames = types?.map(type => <TypeBadge key={type} type={type} />) || 'Unknown';

  return (
    <FullScreenContainer>
      <DetailsContainer>
        <PokemonImage
          className='nes-container is-rounded'
          src={sprites?.front_default || 'placeholder_image_url'}
          alt={name || 'Unknown'}
        />
        <h2>{name || 'Unknown'}</h2>
        <div>타입: {typeNames}</div>
        <p>{description || 'No description available.'}</p>
      </DetailsContainer>
    </FullScreenContainer>
  );
};

export default PokedexDetailsPage;